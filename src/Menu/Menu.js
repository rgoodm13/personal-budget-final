import React from 'react';

import {
    Link
  } from "react-router-dom";


function Menu() {
  return (
    <nav role="navigation">
    <ul>
        <li><Link to="/" role="button">Home</Link></li>
        <li><Link to="/about" role="button">About</Link></li>
        <li><Link to="/login" role="button">Login</Link></li>
    </ul>
</nav>
  );
}

export default Menu;
