import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <div>
        <Link to="/">Home</Link>
        |
        <Link to="/read?mangafile=girls_last_tour/jpg/chapter2.zip">Reader</Link>
      </div>
    </nav>
  );
}

export default Navbar;