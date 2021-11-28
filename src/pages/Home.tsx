import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Loader from 'components/Loader'

import { Title } from 'types/home.types'
import { getTitleNames, getMetadata } from 'utils/requests'
import { PLACEHOLDER_IMG } from 'config';

interface State {
  titles: Record<string, Title[]>
}
class Home extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      titles: {}
    }
  }

  queryTitles = async () => {
    const titles: Record<string, Title[]> = {};
    const titleNames = await getTitleNames();
    for (let i = 0; i < titleNames.length; i += 1 ) {
      const titleName = titleNames[i];
      try {
        const metadata = await getMetadata(titleName);
        const group = metadata.group || 'Other';
        if (!titles[group]) {
          titles[group] = [];
        }
        titles[group].push({
          title: metadata.title || 'Unknown',
          url: metadata.url,
          image: metadata.cover_image || PLACEHOLDER_IMG,
          group: group,
          mangafile: titleName
        })
      } catch (err) {
        console.log(`Could not find metadata for ${titleName}`)
      }
    }

    this.setState({titles})
  }

  async componentDidMount() {
    await this.queryTitles();
  }
  render() {
    return (
      <div className="p-6 bg-backgroundColour text-secondaryColour">
        <Helmet>
          <title>Home | Carrot Reader</title>
        </Helmet>

        <div className="h-20"></div>
        <h1 className="heading">Home</h1>
        <div className="flex flex-col">
          {
            Object.keys(this.state.titles).map((key, index) => {
              return (
                <div key={index}>
                  <h2 className="title">{key}</h2>
                  <div className="flex flex-wrap pb-4 pt-2">
                    {
                      this.state.titles[key].map((item, index) => {
                        return (
                          <Link key={index} to={`/manga/${item.mangafile}`}>
                            <div className="w-52 h-64 m-2 bg-panelBackgroundColour rounded-md">
                              <img src={item.image} className="w-full h-52 object-cover rounded-md"/>
                              <div className="regular font-bold pt-2 px-2 truncate">
                                {item.title}
                              </div>
                            </div>
                          </Link>
                        )
                      })
                    }
                  </div>
                </div>
              )
            })
          }
        </div>
     </div>
    )
  }
}

export default withRouter(Home);