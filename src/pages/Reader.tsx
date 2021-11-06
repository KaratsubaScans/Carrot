import React from 'react';
import { withRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import MangaControl from 'components/MangaControl';
import 'pages/Reader.css';
import { ReaderSettings, ReaderMode, ImageSizing, ColourTheme, Chapter } from 'types/reader.types';

import { fetchZip, extractZip, ZipInfo } from 'services/archive.service';
import { getChapters } from 'utils/requests';
import queryString from 'query-string';

interface State {
  zipped: ZipInfo[],
  images: (string|null)[],
  pageCount: number,
  mangafile: string,
  chapter: string,
  chapters: Chapter[],
  page: string,
  pages: string[],
  readerSettings: ReaderSettings,
}

class Reader extends React.Component<any, State> { // fix typing up

  constructor(props: any) {
    super(props);

    this.state = {
      zipped: [],
      images: [],
      pageCount: 0,
      mangafile: this.props.match.params.mangafile,
      chapter: this.props.match.params.chapter,
      chapters: [{name: 'hello'}, {name: 'helld'}],
      page: this.props.match.params.page,
      pages: ['1','2','3','4','5','6'],
      readerSettings: {
        readerMode: ReaderMode.longStrip,
        imageSizing: ImageSizing.fitHeight,
        colourTheme: ColourTheme.light,
      },
    };
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

    

    const chapters = await getChapters(this.state.mangafile, this.state.chapter);
    this.setState({
      chapters
    });

  }

  loadPage = async (pageNumber: number) => {
    /* TODO check if page is valid */

    const inflated = await extractZip(this.state.zipped[pageNumber].contents);
    const rawImg = inflated.toString('base64');

    this.setState(curState => {
      return {
        ...curState,
        images: this.state.images.splice(pageNumber, 1, rawImg)
      }
    });
  }

  updateReaderSettings = (newReaderSettings: ReaderSettings) => {
    this.setState(curState => ({
      ...curState,
      readerSettings: newReaderSettings
    }));
  }

  updateChapter = (newChapter: string) => {
    this.setState(curState => ({
      ...curState,
      chapter: newChapter,
    }))
  }

  updatePage = (newPage: string) => {
    this.setState(curState => ({
      ...curState,
      page: newPage,
    }))
  }


  async componentDidMount() {
    await this.queryManga();
    // await this.loadPage(1);
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
            if (image == null) return;
            return (
              <div className="mangaimage" key={ind}>
                <img src={`data:image/jpeg;base64,${image}`}/>
              </div>
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
