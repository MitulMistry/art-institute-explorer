import React from 'react';

import { Link } from 'react-router-dom';

export class NavBar extends React.Component {
  render() {
    return (
      <header className="navbar">
        <nav className="header-nav">
        <div>
          <h1 className="header-nav-logo"><Link to="/">AIC Explorer</Link></h1>
          <ul className="header-nav-list clearfix">
            <li><Link to="login">Login</Link></li>
            <li><Link to="signup">Signup</Link></li>
            <li><Link to="artworks">Artworks</Link></li>
            <li><Link to="artworks/saved">Saved Artworks</Link></li>
            <li><Link to="collections">Collections</Link></li>
            <li><Link to="collections/new">New Collection</Link></li>
          </ul>
        </div>
        </nav>
      </header>
    );
  }
}