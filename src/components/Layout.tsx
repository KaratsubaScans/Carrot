import React, { Component } from 'react';
import { useHistory } from 'react-router';

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
  const history = useHistory();

  const [colorTheme, setTheme] = useDarkMode()

  return (
    <div>
      <div className="nav">
        <button onClick={() => history.push('/')}>
          <img src={Logo} alt="Logo" />
        </button>
        <h1 className="heading pl-4">Karatsuba Scan&apos;s Carrot Reader</h1>
        <button className="absolute dark:text-white text-black p-2 m-2 right-4 inset-y-0" onClick={() => setTheme(colorTheme)}>
          {colorTheme === ColourTheme.light ? (<MoonIcon />) : (<SunIcon />)}
        </button>

      </div>

      <main>{props.children}</main>
    </div>
  );

}

export default Layout;
