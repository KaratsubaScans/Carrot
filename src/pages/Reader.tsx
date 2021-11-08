import React, { useRef } from 'react';
import { withRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
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
  images: (string|null)[],
  pageCount: number,
  mangafile: string,
  chapter: number,
  chapters: Chapter[],
  page: number,
  pages: Page[],
  readerSettings: ReaderSettings,
}

class Reader extends React.Component<any, State> {
  myRef: React.RefObject<HTMLDivElement>; // fix typing up

  constructor(props: any) {
    super(props);

    this.state = {
      zipped: [],
      images: [],
      pageCount: 0,
      mangafile: this.props.match.params.mangafile,
      chapter: this.props.match.params.chapter-1,
      chapters: [],
      page: this.props.match.params.page-1,
      pages: [],
      readerSettings: {
        readerMode: ReaderMode.longStrip,
        imageSizing: ImageSizing.fitHeight,
        colourTheme: ColourTheme.light,
      },
    };

    this.myRef = React.createRef();
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

    

    const chapters = await getChapters(this.state.mangafile);
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
        images.push(`${API_URL}/${this.state.mangafile}/jpg/`+
          `${this.state.chapters[this.state.chapter].name}/`+
          `${this.state.pages[i].name}`);
      }

      this.setState({
        images
      }, () => {
        this.myRef?.current?.scrollIntoView()});

    
    }


  }

  updateReaderSettings = (newReaderSettings: ReaderSettings) => {
    this.setState(curState => ({
      ...curState,
      readerSettings: newReaderSettings
    }));
  }

  updateChapter = (newChapter: number) => {
    this.props.history.push(`/read/${this.state.mangafile}/${newChapter+1}/${1}`);
    this.props.history.go(0);

  }

  updatePage = (newPage: number, scroll = false) => {
    this.props.history.replace({ pathname: `/read/${this.state.mangafile}/${this.props.match.params.chapter}/${newPage+1}`})
    this.setState(curState => ({
      ...curState,
      page: newPage,
    }), () => !scroll && this.myRef?.current?.scrollIntoView())
    
  }

  checkVisible = (inView: boolean, ind: number) => {
    if (inView) {
      this.updatePage(ind, true)
    }
  }


  async componentDidMount() {
    await this.queryManga();
    await this.loadPage();
  }

  render() {
    return (
      <div>
        <HelmetProvider>
          <title>Karatsuba | Read</title>
        </HelmetProvider>
        <MangaControl
          readerSettings={this.state.readerSettings}
          updateReaderSettings={this.updateReaderSettings}
          chapter={this.state.chapter}
          chapters={this.state.chapters}
          updateChapter={this.updateChapter}
          page={this.state.page}
          pages={this.state.pages}
          updatePage={this.updatePage}
        ></MangaControl>
 
        <h1>Manga Reader Page</h1>
        <div className="mangaimage-container">
          {this.state.images.map((image, ind) => {
            let ref;
            if (this.state.page === ind) {
              ref = this.myRef;
            }
            if (image == null) return;
            return (
              <InView as="div" key={ind} className="mangaimage" threshold={0.5} onChange={(inView, entry) => this.checkVisible(inView, ind)}>
                <div  key={ind} ref={ref}>
                  <img src={image}/>
                </div>
              </InView>
            )
          })}
          {this.state.readerSettings.readerMode}
          {this.state.readerSettings.imageSizing}
          {this.state.readerSettings.colourTheme}
        </div>
     </div>
    )
  }
}

export default withRouter(Reader);
