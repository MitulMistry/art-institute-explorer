import React from 'react';
import { ArtworksGrid } from '../ArtworksIndex/ArtworksGrid';

export class ArtworksSearched extends React.Component {
  render() {
    const { artworksArray, imageBaseUrl } = this.props;

    return (
      <div className="artworks-index">
        <h1 className="header-ruler">Search Results</h1>
        <ArtworksGrid
          artworksArray={artworksArray}
          imageBaseUrl={imageBaseUrl}
        />
      </div>
    );
  }
}