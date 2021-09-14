import React, { Component } from 'react';

import Logo from 'assets/logo/logo.svg'
import './Layout.css'
import useDarkMode from 'hooks/useDarkMode'

type layoutProps = {
  children: JSX.Element
}

const Layout = ({children}: any ) => {

  const [colorTheme, setTheme] = useDarkMode()

  return (
    <div className="dark">
      <div className="nav">
        <img src={Logo} alt="Logo" />
        <h1 className="heading pl-2">Karatsuba Scan&apos;s Carrot Reader</h1>
        <button onClick={() => setTheme(colorTheme)}>Toggle</button>

      </div>

      <main>{children}</main>
    </div>
  );

}

export default Layout;
