import React from 'react';
import { Link } from 'react-router-dom';

import 'components/Navbar.css';
import Logo from 'assets/logo/logo.svg'

const Navbar = () => {
  return (
    <nav className='nav-body'>
      <img src={Logo} alt="" />
    </nav>
  );
}

export default Navbar;