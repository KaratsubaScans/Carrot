import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

import { Metadata, Chapter } from 'types/reader.types'
import { getMetadata, getChapters } from 'utils/requests'
import { PLACEHOLDER_IMG } from 'config';
import Loader from 'components/Loader';

interface State {
  mangafile: string,
  metadata: Metadata | Record<string, never> ,
  chapters: Chapter[],
}
class Manga extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      mangafile: this.props.match.params.mangafile,
      metadata: {},
      chapters: [],
    }
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
    this.setState({
      chapters,
      metadata,
    });
  }


  async componentDidMount() {
    await this.queryManga();
  }

  render() {
    return (
      <div className="p-6 bg-backgroundColour text-secondaryColour">
        <Helmet>
          <title>{this.state.metadata.title || 'Manga'} | Carrot Reader</title>
        </Helmet>

        <div className="h-20"></div>
        {
          this.state.metadata.title ? 
          <h1 className="heading">{this.state.metadata.title || 'Manga'}</h1> :
          <div className="w-72 h-20"><Loader/></div>
        }
        <div className="flex flex-row space-x-4">
        {
          this.state.metadata.title ? 
          (
            <Fragment>
              <img src={this.state.metadata.cover_image} alt="Cover Image" />
              <p className="regular w-72">{this.state.metadata.description || 'No description'}</p>
            </Fragment>
          ):
          (
            <Fragment>
              <div className="w-72 h-96"><Loader/></div>
              <div className="w-72 h-96"><Loader/></div>
            </Fragment>
          )
        }
       </div>
       <div className="flex flex-col space-y-2">
         {
           this.state.chapters.map((chapter, index) => {
             return (
               <Link key={index} to={`/read/${this.state.mangafile}/${index+1}/1`}>Chapter {index+1}</Link>
             )
           })
         }
       </div>
     </div>
    )
  }
}

export default withRouter(Manga);