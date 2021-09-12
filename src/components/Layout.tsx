import React, { Component } from 'react';

import Logo from 'assets/logo/logo.svg'
import './Layout.css'

type layoutProps = {
  children: JSX.Element
}

export default class Layout extends Component<layoutProps, Record<string, never> > {
  render() {
    return (
      <>
        <div className="nav">
          <img src={Logo} alt="Logo" />
          <h1 className="heading pl-2">Karatsuba Scan&apos;s Carrot Reader</h1>

        </div>

        <main>{this.props.children}</main>
      </>
    )
  }

}
