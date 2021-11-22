import React, { useRef, MouseEvent } from 'react';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { InView } from 'react-intersection-observer';

import Loader from 'components/Loader'
import MangaControl from 'components/MangaControl';
import 'pages/Reader.css';

import { ReaderSettings, KeyBindings, ReaderMode, ImageSizing, ColourTheme, Page, Chapter } from 'types/reader.types';

import { fetchZip, extractZip, ZipInfo } from 'services/archive.service';
import { getPages, getChapters, getImage } from 'utils/requests';
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
      colourTheme: ColourTheme.light,
      menuOpen: true,
      autoLoadChapter: true,
    }

    const savedSettings = localStorage.getItem('carrotSettings');
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
      loaded: false,
      readerSettings,
      keyBindings,
    };

    this.myRef = React.createRef();
  }

  mangaName = (): string => {
    return this.state.mangafile
      .split('_')
      .map((word) => word[0].toLocaleUpperCase() + word.substring(1))
      .join(' ');

  }

  loadImage = async (src: string) => {
    const img = new Image();
    img.src = src;
    return img;

  }


  queryManga = async () => {

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
      pages
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

  updateReaderSettings = (newReaderSettings: Partial<ReaderSettings>) => {
    this.setState(curState => ({
      ...curState,
      readerSettings: { ...this.state.readerSettings, ...newReaderSettings }
    }));
    localStorage.setItem("carrotSettings", JSON.stringify(newReaderSettings))
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
    }), () => (!scroll && this.state.loaded) && this.myRef?.current?.scrollIntoView())

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
  nextPage = () => {
    if (this.state.page + 1 < this.state.pages.length) {
      this.updatePage(this.state.page + 1)
    }
    else if (this.state.readerSettings.autoLoadChapter) {
      this.nextChapter();
    }
  };
  previousPage = () => {
    if (this.state.page - 1 >= 0) {
      this.updatePage(this.state.page - 1)
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


  toClasses = (options: string[]) => {
    let classes = '';
    for (let i = 0; i < options.length; i += 1) {
      classes += options[i].split(' ').join('') + ' ';
    }
    return classes;
  }

  handleMouseEvent = (e: MouseEvent<HTMLDivElement>) => {
    if (e.pageX < window.innerWidth * 0.5) {
      this.previousPage();
    } else {
      this.nextPage();
    }
  }

  setKeyBindings = (newKeyBindings: KeyBindings) => {
    this.setState(curState => ({
      ...curState,
      keyBindings: newKeyBindings
    }));
    localStorage.setItem("carrotKeyBindings", JSON.stringify(newKeyBindings))
  }

  handleHotKeys = (event: KeyboardEvent) => {
    const key = event.key.toUpperCase();
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
          <title>{this.mangaName()} | Carrot Reader</title>
        </Helmet>
        <MangaControl
          mangaName={this.mangaName()}
          readerSettings={this.state.readerSettings}
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
            this.state.readerSettings.readerMode === 'Long Strip' ?
              (
                this.state.pages.map((page, ind) => {
                  let ref;
                  if (this.state.page === ind) {
                    ref = this.myRef;
                  }
                  return (
                    <InView
                      as="div"
                      key={ind}
                      threshold={0.3}
                      onChange={(inView, entry) => this.checkVisible(inView, ind)}
                      className={this.toClasses([this.state.readerSettings.imageSizing, this.state.readerSettings.readerMode])}
                    >
                      {
                        (this.state.imageFiles[ind] !== "") ? <img src={this.state.imageFiles[ind]} ref={ref} className="w-full h-full object-contain" />
                          :
                          <Loader refImg={ref} />
                      }

                    </InView>
                  )
                })
              ) :
              (
                <InView
                  as="div"
                  threshold={0.5}
                  onChange={(inView, entry) => this.checkVisible(inView, this.state.page)}
                  className={this.toClasses([this.state.readerSettings.imageSizing, this.state.readerSettings.readerMode])}
                >
                  {

                    (this.state.imageFiles[this.state.page] !== '') ?
                      <img src={this.state.imageFiles[this.state.page]} className="w-full h-full object-contain" />
                      :
                      <Loader refImg={this.myRef} />
                  }
                </InView>
              )

          }
        </div>
      </div>
    )
  }
}

export default withRouter(Reader);
