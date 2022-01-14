import React from 'react';
import { Link } from 'react-router-dom';
import SearchBarContainer from './SearchBarContainer';
import AuthLinksContainer from './AuthLinksContainer';

import AICLogo from 'images/aic_logo.svg';

export class NavBar extends React.Component {
  render() {
    const { loggedIn } = this.props;
    let links = null;

    if (loggedIn) {
      links = (
        <ul>
          <li><Link to="/artworks">Artworks</Link></li>
          <li><Link to="/artworks/saved">Saved Artworks</Link></li>
          <li><Link to="/collections">Collections</Link></li>
          <li><Link to="/collections/new">New Collection</Link></li>            
        </ul>
      );      
    } else {
      links = (
        <ul>
          <li><Link to="/artworks">Artworks</Link></li>
          <li><Link to="/collections">Collections</Link></li>           
        </ul>
      );
    }

    return (
      <header className="header">
        <nav className="header-nav clearfix">
        <div>
          <span className="header-nav-logo">
            <Link to="/">
              <img src={AICLogo} className="header-nav-logo-img" alt="logo" />
            </Link>
          </span>
          <div className="header-nav-list clearfix">
          {links}
          <SearchBarContainer />
          <AuthLinksContainer />
          </div>
        </div>
        </nav>
      </header>
    );
  }
}