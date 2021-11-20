import React, { Component } from 'react';

import Logo from 'assets/logo/logo.svg'
import './Layout.css'
import useDarkMode from 'hooks/useDarkMode'
import { prependOnceListener } from 'process';

type layoutProps = {
  children: JSX.Element
}

const Layout = (props: layoutProps) => {

  const [colorTheme, setTheme] = useDarkMode()

  return (
    <div className="layout-background">
      <div className="nav">
        <button onClick={() => console.log('home')}>
          <img src={Logo} alt="Logo" />
        </button>
        <h1 className="heading pl-2">Karatsuba Scan&apos;s Carrot Reader</h1>
        <button className="border rounded-lg text-white bg-gray-700 p-2 m-2" onClick={() => setTheme(colorTheme)}>Toggle</button>

      </div>

      <main>{props.children}</main>
    </div>
  );

}

export default Layout;
