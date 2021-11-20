import React, { useRef, MouseEvent } from 'react';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { InView } from 'react-intersection-observer';

import MangaControl from 'components/MangaControl';
import 'pages/Reader.css';
import { ReaderSettings, ReaderMode, ImageSizing, ColourTheme, Page, Chapter } from 'types/reader.types';
import Loader from 'components/Loader'

import { fetchZip, extractZip, ZipInfo } from 'services/archive.service';
import { getPages, getChapters, getImage } from 'utils/requests';
import queryString from 'query-string';
import { API_URL } from 'config';

interface State {
  zipped: ZipInfo[],
  images: (string)[],
  imageFiles: (string)[],
  pageCount: number,
  mangafile: string,
  chapter: number,
  chapters: Chapter[],
  page: number,
  pages: Page[],
  loaded: boolean,
  readerSettings: ReaderSettings,
}

class Reader extends React.Component<any, State> {
  myRef: React.RefObject<HTMLImageElement>; // fix typing up

  constructor(props: any) {
    super(props);
    let readerSettings = {
      readerMode: ReaderMode.longStrip,
      imageSizing: ImageSizing.fitHeight,
      colourTheme: ColourTheme.light,
    }

    const savedSettings = localStorage.getItem('carrotSettings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings)
        if (!parsedSettings.readerMode) {
          parsedSettings.readerMode = ReaderMode.longStrip;
        }
        if (!parsedSettings.imageSizing) {
          parsedSettings.imageSizing = ImageSizing.fitHeight;
        }
        if (!parsedSettings.colourTheme) {
          parsedSettings.colourTheme = ColourTheme.light;
        }

        readerSettings = parsedSettings
      }
      catch (err) {
        console.log('No settings found.')
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

  updateReaderSettings = (newReaderSettings: ReaderSettings) => {
    this.setState(curState => ({
      ...curState,
      readerSettings: newReaderSettings
    }));
    localStorage.setItem("carrotSettings", JSON.stringify(newReaderSettings))
  }

  updateChapter = (newChapter: number) => {
    this.props.history.push(`/read/${this.state.mangafile}/${newChapter + 1}/${1}`);
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
  previousChapter = () => {
    if (this.state.chapter - 1 >= 0) {
      this.updateChapter(this.state.chapter - 1)
    }
  };
  nextPage = () => {
    if (this.state.page + 1 < this.state.pages.length) {
      this.updatePage(this.state.page + 1)
    }
  };
  previousPage = () => {
    if (this.state.page - 1 >= 0) {
      this.updatePage(this.state.page - 1)
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
    console.log(this.state.imageFiles)
    if (e.pageX < window.innerWidth * 0.5) {
      this.previousPage();
    } else {
      this.nextPage();
    }

  }


  async componentDidMount() {
    await this.queryManga();
    await this.loadPage();
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
