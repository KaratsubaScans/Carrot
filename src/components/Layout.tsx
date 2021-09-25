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
    <div className="layout-background">
      <div className="nav">
        <img src={Logo} alt="Logo" />
        <h1 className="heading pl-2">Karatsuba Scan&apos;s Carrot Reader</h1>
        <button className="border rounded-lg text-white bg-gray-700 p-2 m-2" onClick={() => setTheme(colorTheme)}>Toggle</button>

      </div>

      <main>{children}</main>
    </div>
  );

}

export default Layout;
