import React, { useRef, MouseEvent } from 'react';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { InView } from 'react-intersection-observer';

import Loader from 'components/Loader'
import MangaControl from 'components/MangaControl';
import 'pages/Reader.css';

import { ReaderSettings, KeyBindings, ReaderMode, ImageSizing, Page, Chapter, StorageKey, Metadata } from 'types/reader.types';

import { fetchZip, extractZip, ZipInfo } from 'services/archive.service';
import { getPages, getChapters, getImage, getMetadata } from 'utils/requests';
import queryString from 'query-string';
import { API_URL } from 'config';

interface State {
  zipped: ZipInfo[],
  images: string[],
  imageFiles: string[],
  pageCount: number,
  mangafile: string,
  chapter: number,
  chapters: Chapter[],
  page: number,
  pages: Page[],
  metadata: Metadata | Record<string, never>,
  loaded: boolean,
  readerSettings: ReaderSettings,
  keyBindings: KeyBindings,
}

class Reader extends React.Component<any, State> {
  myRef: React.RefObject<HTMLImageElement>; // fix typing up

  constructor(props: any) {
    super(props);
    let readerSettings = {
      readerMode: ReaderMode.longStrip,
      imageSizing: ImageSizing.fitHeight,
      colourTheme: 'Light',
      menuOpen: true,
      autoLoadChapter: true,
    }

    const savedSettings = localStorage.getItem(StorageKey.carrotSettings);
    if (savedSettings) {
      try {
        const parsedSettings: Partial<ReaderSettings> = JSON.parse(savedSettings)
        readerSettings = { ...readerSettings, ...parsedSettings }
      }
      catch (err) {
        console.log('No settings found.')
      }
    }

    let keyBindings = {
      previousPage: "k",
      nextPage: "j",
      previousChapter: "h",
      nextChapter: "l",
    }
    const keyBindingsLocal = localStorage.getItem('carrotKeyBindings')
    if (keyBindingsLocal) {
      try {
        const keyBindingsParsed: Partial<KeyBindings> = JSON.parse(keyBindingsLocal);
        keyBindings = { ...keyBindings, ...keyBindingsParsed }
      } catch (err) {
        console.log('Key Binding settings not found.')
      }
    }

    this.state = {
      zipped: [],
      images: [],
      imageFiles: [],
      pageCount: 0,
      mangafile: this.props.match.params.mangafile,
      chapter: this.props.match.params.chapter - 1,
      chapters: [],
      page: this.props.match.params.page - 1,
      pages: [],
      metadata: {},
      loaded: false,
      readerSettings,
      keyBindings,
    };

    this.myRef = React.createRef();
  }

  loadImage = async (src: string) => {
    const img = new Image();
    img.src = src;
    return img;
  }

  queryManga = async () => {
    let metadata: Metadata | Record<string, never>= {};
    try {
      metadata = await getMetadata(this.state.mangafile);
    } catch (err) {
      this.props.history.push('/404');
    }
    let chapters: Chapter[] = [];
    try {
      chapters = await getChapters(this.state.mangafile);
    } catch (err) {
      this.props.history.push('/404');
      return;
    }
    const pages = await getPages(this.state.mangafile, chapters[this.state.chapter].name);
    this.setState({
      chapters,
      pages,
      metadata,
    });
  }

  loadPage = async (pageNumber = -1) => {
    if (pageNumber === -1) {
      // load everything
      const images: string[] = [];
      const promises: (() => void)[] = [];
      const imageFiles = []
      for (let i = 0; i < this.state.pages.length; i += 1) {
        images.push(`${API_URL}/${this.state.mangafile}/jpg/` +
          `${this.state.chapters[this.state.chapter].name}/` +
          `${this.state.pages[i].name}`);
        imageFiles.push('')
        const loadFunction = async (url: string, index: number) => {
          const file = await getImage(url);
          const imageFiles = this.state.imageFiles
          imageFiles[index] = `data:image/png;base64,${file}`;
          this.setState({
            imageFiles
          })
        }
        promises.push(() => loadFunction(images[i], i))
      }

      this.setState({
        images,
        imageFiles,
        loaded: true,
      }, () => {
        this.myRef?.current?.scrollIntoView()
        promises.map(task => task())
      });
    }
  }

  scrollDown = () => {
    window.scrollBy({top: window.innerHeight, left: 0, behavior: 'smooth'}) 
  }

  scrollUp = () => {
    window.scrollBy({top: window.innerHeight * -1, left: 0, behavior: 'smooth'}) 
  }

  updateReaderSettings = (newReaderSettings: Partial<ReaderSettings>, updateLocalStorage = true) => {
    const readerSettings = { ...this.state.readerSettings, ...newReaderSettings }
    this.setState(curState => ({
      ...curState,
      readerSettings,
    }), () => {
      if (newReaderSettings.readerMode === ReaderMode.longStrip) {
        this.myRef.current?.scrollIntoView()
      }
    });
    if (updateLocalStorage) {
      localStorage.setItem(StorageKey.carrotSettings, JSON.stringify(readerSettings))
    }
  }

  updateChapter = async (newChapter: number, previousPage = false) => {
    let newPage = 1;
    if (previousPage) {
      const previousPages = await getPages(this.state.mangafile, this.state.chapters[this.state.chapter - 1].name)
      newPage = previousPages.length
    }
    this.props.history.push(`/read/${this.state.mangafile}/${newChapter + 1}/${newPage}`);
    this.props.history.go(0);
  }

  updatePage = (newPage: number, scroll = false) => {
    this.props.history.replace({ pathname: `/read/${this.state.mangafile}/${this.props.match.params.chapter}/${newPage + 1}` })
    this.setState(curState => ({
      ...curState,
      page: newPage,
    }), () => {
      if (!scroll && this.state.loaded) {
          this.myRef?.current?.scrollIntoView()
      }
    })
  }

  nextChapter = () => {
    if (this.state.chapter + 1 < this.state.chapters.length) {
      this.updateChapter(this.state.chapter + 1)
    }
  };

  previousChapter = (previousPage = false) => {
    if (this.state.chapter - 1 >= 0) {
      this.updateChapter(this.state.chapter - 1, previousPage)
    }
  };

  nextPage = (clicked = false) => {
    if (this.state.page + 1 < this.state.pages.length) {
      if (this.state.metadata.type !== 'manga' && clicked) {
        this.scrollDown()
      } else {
        this.updatePage(this.state.page + 1)
      }
    }
    else if (this.state.readerSettings.autoLoadChapter) {
      this.nextChapter();
    }
  };

  previousPage = (clicked = false) => {
    if (this.state.page - 1 >= 0) {
      if (this.state.metadata.type !== 'manga' && clicked) {
        this.scrollUp()
      } else {
        this.updatePage(this.state.page - 1)
      }
    }
    else if (this.state.readerSettings.autoLoadChapter) {
      this.previousChapter(true);
    }
  };

  checkVisible = (inView: boolean, ind: number) => {
    if (inView) {
      this.updatePage(ind, true)
    }
  }

  toClasses = (index: number) => {
    let classes = '';
    const options = [];
    if (this.state.metadata.type !== 'manga') {
      options.push(ReaderMode.longStrip)
      options.push(ImageSizing.original)
    } else {
      options.push(this.state.readerSettings.readerMode)
      options.push(this.state.readerSettings.imageSizing)
    }

    for (let i = 0; i < options.length; i += 1) {
      classes += options[i].split(' ').join('') + ' ';
    }
    if (this.state.readerSettings.readerMode === ReaderMode.singlePage && index !== this.state.page && this.state.metadata.type === 'manga') {
      classes += 'hidden'
    }
    return classes;
  }

  handleMouseEvent = (e: MouseEvent<HTMLDivElement>) => {
    if (e.pageX < window.innerWidth * 0.5) {
      this.previousPage(true);
    } else {
      this.nextPage(true);
    }
  }

  setKeyBindings = (newKeyBindings: Partial<KeyBindings>) => {
    const keyBindings = { ...this.state.keyBindings, ...newKeyBindings }
    this.setState(curState => ({
      ...curState,
      keyBindings
    }));
    localStorage.setItem("carrotKeyBindings", JSON.stringify(keyBindings))
  }

  handleHotKeys = (event: KeyboardEvent) => {
    const key = event.key;
    if (key === this.state.keyBindings.previousPage) {
      this.previousPage()
    }
    if (key === this.state.keyBindings.nextPage) {
      this.nextPage()
    }
    if (key === this.state.keyBindings.previousChapter) {
      this.previousChapter()
    }
    if (key === this.state.keyBindings.nextChapter) {
      this.nextChapter()
    }
  }

  async componentDidMount() {
    await this.queryManga();
    await this.loadPage();
    document.addEventListener("keydown", this.handleHotKeys, false)
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleHotKeys, false)
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>{this.state.metadata.title || 'Manga'} | Carrot Reader</title>
        </Helmet>
        <MangaControl
          mangaName={this.state.metadata.title || 'Manga'}
          mangafile={this.state.mangafile}
          readerSettings={this.state.readerSettings}
          mangaType={this.state.metadata.type}
          updateReaderSettings={this.updateReaderSettings}
          keyBindings={this.state.keyBindings}
          setKeyBindings={this.setKeyBindings}
          chapter={this.state.chapter}
          chapters={this.state.chapters}
          nextChapter={this.nextChapter}
          previousChapter={this.previousChapter}
          updateChapter={this.updateChapter}
          page={this.state.page}
          pages={this.state.pages}
          nextPage={this.nextPage}
          previousPage={this.previousPage}
          updatePage={this.updatePage}
        ></MangaControl>

        <div className="p-4">Manga Reader Page</div>
        <div onMouseDown={this.handleMouseEvent} className="mangaimage-container">
          {
            this.state.pages.map((page, ind) => {
              let ref;
              if (this.state.page === ind) {
                ref = this.myRef;
              }
              return (
                <InView
                  as="div"
                  key={ind}
                  threshold={0.1}
                  onChange={(inView, entry) => this.checkVisible(inView, ind)}
                  className={this.toClasses(ind)}
                >
                  {
                    (this.state.imageFiles[ind] !== "") ?
                      <img src={this.state.imageFiles[ind]} ref={ref} className="w-full h-full object-contain" />
                      :
                      <Loader refImg={ref} classProps="loader-read" />
                  }

                </InView>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default withRouter(Reader);
