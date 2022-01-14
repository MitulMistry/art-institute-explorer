import React from 'react';
import { Link } from 'react-router-dom';
import { CollectionsGrid } from '../CollectionsIndex/CollectionsGrid';
import { ArtworksGrid } from '../ArtworksIndex/ArtworksGrid';

import SplashImage from 'images/aic_splash_01.jpg';

export class HomePage extends React.Component {
  componentDidMount() {
    // Dispatch Redux action to fetch mixed data index via API call
    const { fetchMixedDataIndex } = this.props;
    fetchMixedDataIndex();
  }

  render() {
    const { loggedIn, artworksArray, collectionsArray, imageBaseUrl } = this.props;
    
    let signupButton = null;

    if (!loggedIn) {
      signupButton = (
        <div className="signup-btn">
          <Link to="/signup">
            <button className="btn-primary">Sign Up</button>
          </Link>
        </div>
      );
    }

    return (
      <div className="home-page">
        <h1 className="header-ruler title">AIC Explorer</h1>
        <img src={SplashImage} className="img-responsive img-splash" alt="splash image" />
        <p>
          Explore thousands of artworks from the Art Institute of Chicago (AIC).
          Save your favorite artworks to your profile and create custom collections to share.
        </p>
        {signupButton}

        <div className="artworks">
          <h1 className="header-ruler">Artworks</h1>
          <ArtworksGrid
              artworksArray={artworksArray}
              imageBaseUrl={imageBaseUrl}
            />
        </div>

        <div className="collections">
          <h1 className="header-ruler">Collections</h1>
          <CollectionsGrid
            collectionsArray={collectionsArray}
          />
        </div>
      </div>
    );
  }
}