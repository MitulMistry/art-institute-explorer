import React from 'react';
import { CollectionsGrid } from '../CollectionsIndex/CollectionsGrid';
import { ArtworksGrid } from '../ArtworksIndex/ArtworksGrid'; 

export class HomePage extends React.Component {
  componentDidMount() {
    // Dispatch Redux action to fetch mixed data index via API call
    const { fetchMixedDataIndex } = this.props;
    fetchMixedDataIndex();
  }

  render() {
    const { artworksArray, collectionsArray, imageBaseUrl } = this.props;
    
    return (
      <div className="home-page">
        <h1 className="header-ruler">AIC Explorer</h1>
        <p>
          Explore thousands of artworks from the Art Institute of Chicago (AIC).
          Save your favorite artworks to your profile and create custom collections to share.
        </p>

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