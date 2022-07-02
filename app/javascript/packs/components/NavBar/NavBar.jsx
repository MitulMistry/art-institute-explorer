import React from 'react';
import { Link } from 'react-router-dom';
import SearchBarContainer from './SearchBarContainer';
import AuthLinksContainer from './AuthLinksContainer';

import AICLogo from 'images/aic_logo.svg';

export class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navOpen: false
    };
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    this.setState(prevState => ({
      navOpen: !prevState.navOpen
    }));
  }

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
        <div className={this.state.navOpen ? "nav-show" : "nav-close"}>
          <span className="header-nav-logo">
            <Link to="/">
              <img src={AICLogo} className="header-nav-logo-img" alt="logo" />
            </Link>
          </span>
          <div className="header-nav-list clearfix">
          {links}
          <SearchBarContainer />
          <AuthLinksContainer />
          {/* <button id="nav-toggle" onClick={this.handleToggle}>
            { this.state.navOpen ? "Close" : "Open" }
          </button> */}
          </div>
        </div>
        </nav>
      </header>
    );
  }
}