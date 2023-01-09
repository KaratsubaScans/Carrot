import React, { Component, useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import Logo from 'assets/logo/logo.svg'
import './Layout.css'
import useTheme from 'hooks/useTheme'
import { SunIcon, MoonIcon } from 'components/Icons'
import { Link } from 'react-router-dom'

type layoutProps = {
  children: JSX.Element
}

const Layout = (props: layoutProps) => {
  const history = useHistory();

  const [colorTheme, setTheme] = useTheme()
  const [notReader, setReader] = useState(false)

  history.listen(() => {
    if (history.location.pathname.substring(0, 5) == "/read") {
      setReader(false)
    } else {
      setReader(true)
    }
  })

  return (
    <div>
      {
        notReader &&
        <div className="nav">
          <Link to="/">
            <button>
              <img src={Logo} alt="Logo" />
            </button>
          </Link>
          <h1 className="title pl-4">Karatsuba Scan&apos;s Carrot Reader</h1>
        </div>
      }
        {/*

        <button className="absolute dark:text-white text-primaryColour p-2 m-2 right-4 inset-y-0" onClick={() => setTheme(colorTheme)}>
          {colorTheme === "light" ? (<MoonIcon />) : (<SunIcon />)}
          {colorTheme}
        </button>

        */}


      <main>{props.children}</main>
    </div>
  );

}

export default Layout;
