import React, { Component } from 'react';
import './layout.css';

type layoutProps = {
  children: JSX.Element
}

export default class Layout extends Component<layoutProps, Record<string, never> > {
  render() {
    return (
      <div>
        <div>
          <h1>LMAOOOOOO this is the layout</h1>

        </div>
        <main>{this.props.children}</main>
      </div>
    )
  }

}
