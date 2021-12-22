import React from 'react';
import { Link } from 'react-router-dom';
import AuthLinksContainer from './AuthLinksContainer';

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
          <h1 className="header-nav-logo"><Link to="/">AIC Explorer</Link></h1>
          <div className="header-nav-list clearfix">
          {links}
          <AuthLinksContainer />
          </div>
        </div>
        </nav>
      </header>
    );
  }
}