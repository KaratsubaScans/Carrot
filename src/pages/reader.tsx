import React, { MouseEvent, Props } from 'react';
import { withRouter } from 'react-router-dom';
import MangaControl from 'components/mangacontrol';
import 'pages/reader.css';

import { fetchZip, extractZip } from 'services/archive.service';
import queryString from 'query-string';

class Reader extends React.Component<any, any> { // fix typing up

  state = {
    images: []
  };

  queryManga = async () => {
    const qs = queryString.parse(this.props.location.search);

    const zipInfo = await fetchZip(`https://files.karatsubascans.com/${qs.mangafile}`);

    const inflatedImages = [];
    // lazy extract files as user scrolls to improve speed
    for await (const deflated of zipInfo) {
      const inflated = await extractZip(deflated.contents);
      inflatedImages.push(inflated.toString('base64'));
    }
    this.setState({ images: inflatedImages });
  }

  componentDidMount() {
    this.queryManga();
  }

  render() {
    return (
      <div>
        <h1>Manga Reader Page</h1>
        <div className="mangaimage-container">
          {this.state.images.map((image, ind) => (
            <div className="mangaimage" key={ind}>
              <img src={`data:image/jpeg;base64,${image}`}/>
            </div>
          ))}
        </div>
        <MangaControl></MangaControl>
      </div>
    )
  }
}

export default withRouter(Reader);