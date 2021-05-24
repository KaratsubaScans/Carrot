import React, { MouseEvent } from 'react';
import { fetchZip, extractZip } from '../services/archive.service';

export default class Image extends React.Component {

  state = {
    images: []
  };

  testingClick = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const zipInfo = await fetchZip('https://files.karatsubascans.com/girls_last_tour/jpg/chapter1.zip');
    const inflatedImages = [];
    for await (const deflated of zipInfo) {
      const inflated = await extractZip(deflated.contents);
      inflatedImages.push(inflated.toString('base64'));
    }
    this.setState({ images: inflatedImages });
  }

  render() {
    return (
      <div>
        <h1>page</h1>
        <button onClick={this.testingClick}>test</button>
        <div>
          {this.state.images.map((image) => (
            <img src={`data:image/jpeg;base64,${image}`} key={1}/> // find a better way to do key later
          ))}
        </div>
      </div>
    )
  }
}