// src/components/Layout.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Layout.css'

const Layout = ({ children }) => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/PlayerProfiles">Player Profiles</Link>
          </li>
          <li>
            <Link to="/PositionLeaders">Position Leaders</Link>
          </li>
          <li>
            <Link to="/Roadmap">Site Roadmap</Link>
          </li>
        </ul>
      </nav>
      <div>{children}</div>
    </div>
  );
};

export default Layout;
