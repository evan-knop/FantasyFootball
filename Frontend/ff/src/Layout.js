// src/components/Layout.js
import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/"></Link>
          </li>
          <li>
            <Link to="/Landing">Home</Link>
          </li>
        </ul>
      </nav>
      <div>{children}</div>
    </div>
  );
};

export default Layout;
