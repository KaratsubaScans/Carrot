import React, { Component } from 'react';

import Logo from 'assets/logo/logo.svg'
import './Layout.css'
import useDarkMode from 'hooks/useDarkMode'
import { SunIcon, MoonIcon } from 'components/Icons'
import { prependOnceListener } from 'process';
import { ColourTheme } from 'types/reader.types';

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
        <h1 className="heading pl-4">Karatsuba Scan&apos;s Carrot Reader</h1>
        <button className="absolute dark:text-white text-black p-2 m-2 right-0 inset-y-0" onClick={() => setTheme(colorTheme)}>
          {colorTheme === ColourTheme.light ? (<MoonIcon />) : (<SunIcon />)}
        </button>

      </div>

      <main>{props.children}</main>
    </div>
  );

}

export default Layout;
