import React, { MouseEvent, Props } from 'react';
import { withRouter } from 'react-router-dom';
import { fetchZip, extractZip } from '../services/archive.service';
import queryString from 'query-string';

class Reader extends React.Component<any, any> { // fix typing up

  state = {
    images: []
  };

  testingClick = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

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

  render() {
    return (
      <div>
        <h1>Manga Reader Page</h1>
        <p>location: </p>
        <button onClick={this.testingClick}>test</button>
        <div>
          {this.state.images.map((image, ind) => (
            <img src={`data:image/jpeg;base64,${image}`} key={ind}/>
          ))}
        </div>
      </div>
    )
  }
}

export default withRouter(Reader);