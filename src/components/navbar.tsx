import React from 'react';
import { Link } from 'react-router-dom';

import 'components/navbar.css';

const Navbar = () => {
  return (
    <nav className='nav-body'>
      <Link className="nav-item" to="/">Home</Link>
      <Link className="nav-item" to="/read?mangafile=girls_last_tour/jpg/chapter2.zip">Reader</Link>
    </nav>
  );
}

export default Navbar;