import React, { useRef, MouseEvent } from 'react';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { InView } from 'react-intersection-observer';

import MangaControl from 'components/MangaControl';
import 'pages/Reader.css';
import { ReaderSettings, ReaderMode, ImageSizing, ColourTheme, Page, Chapter } from 'types/reader.types';

import { fetchZip, extractZip, ZipInfo } from 'services/archive.service';
import { getPages, getChapters } from 'utils/requests';
import queryString from 'query-string';
import { API_URL } from 'config';

interface State {
  zipped: ZipInfo[],
  images: (string | null)[],
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

    this.state = {
      zipped: [],
      images: [],
      pageCount: 0,
      mangafile: this.props.match.params.mangafile,
      chapter: this.props.match.params.chapter - 1,
      chapters: [],
      page: this.props.match.params.page - 1,
      pages: [],
      loaded: false,
      readerSettings: {
        readerMode: ReaderMode.longStrip,
        imageSizing: ImageSizing.fitHeight,
        colourTheme: ColourTheme.light,
      },
    };

    this.myRef = React.createRef();
  }

  mangaName = (): string => {
    return this.state.mangafile
      .split('_')
      .map((word) => word[0].toLocaleUpperCase() + word.substring(1))
      .join(' ');

  }



  queryManga = async () => {
    // const qs = queryString.parse(this.props.location.search);

    // const zipInfo = await fetchZip(`https://files.karatsubascans.com/${qs.mangafile}`);

    // // const inflatedImages: string[] = [];
    // // for await (const deflated of zipInfo) {
    // //   const inflated = await extractZip(deflated.contents);
    // //   inflatedImages.push(inflated.toString('base64'));
    // // }

    // this.setState(curState => ({
    //   ...curState,
    //   zipped: zipInfo,
    //   images: zipInfo.map(zip => null),
    //   pageCount: zipInfo.length
    // }));



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
    /* TODO check if page is valid */

    // const inflated = await extractZip(this.state.zipped[pageNumber].contents);
    // const rawImg = inflated.toString('base64');

    // this.setState(curState => {
    //   return {
    //     ...curState,
    //     images: this.state.images.splice(pageNumber, 1, rawImg)
    //   }
    // });

    if (pageNumber === -1) {
      // load everything
      const images = [];
      for (let i = 0; i < this.state.pages.length; i += 1) {
        images.push(`${API_URL}/${this.state.mangafile}/jpg/` +
          `${this.state.chapters[this.state.chapter].name}/` +
          `${this.state.pages[i].name}`);
      }

      this.setState({
        images,
        loaded: true,
      }, () => {
        this.myRef?.current?.scrollIntoView()
      });

    }


  }

  updateReaderSettings = (newReaderSettings: ReaderSettings) => {
    this.setState(curState => ({
      ...curState,
      readerSettings: newReaderSettings
    }));
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
    console.log(e.pageX, e.clientX, window.innerWidth)
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
          nextPage={this.nextChapter}
          previousPage={this.previousChapter}
          updatePage={this.updatePage}
        ></MangaControl>

        <div className="p-4">Manga Reader Page</div>
        <div onMouseDown={this.handleMouseEvent} className="mangaimage-container">
          {
            this.state.readerSettings.readerMode === 'Long Strip' ?
              (
                this.state.images.map((image, ind) => {
                  let ref;
                  if (this.state.page === ind) {
                    ref = this.myRef;
                  }
                  if (image == null) return;
                  return (
                    <InView
                      as="div"
                      key={ind}
                      threshold={0.5}
                      onChange={(inView, entry) => this.checkVisible(inView, ind)}
                      className={this.toClasses([this.state.readerSettings.imageSizing, this.state.readerSettings.readerMode])}
                    >
                      <img src={image} ref={ref} className="w-full h-full object-contain placeholder-transparent" />
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
                  <img src={this.state.images[this.state.page] || undefined} className="w-full h-full object-contain placeholder-transparent" />
                </InView>
              )

          }
        </div>
      </div>
    )
  }
}

export default withRouter(Reader);
