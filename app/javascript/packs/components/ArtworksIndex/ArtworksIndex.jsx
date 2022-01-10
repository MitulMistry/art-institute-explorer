import React from 'react';
import { ArtworksGrid } from './ArtworksGrid';
import ArtworksPaginationButtonsContainer from './ArtworksPaginationButtonsContainer';

export class ArtworksIndex extends React.Component {
  componentDidMount() {
    // Dispatch Redux action to fetch Artworks via API call
    const { fetchArtworks } = this.props;
    fetchArtworks();
  }

  render() {
    const { artworksArray, imageBaseUrl } = this.props;

    return (
      <div className="artworks-index">
        <h1 className="header-ruler">Artworks</h1>
        <ArtworksGrid
          artworksArray={artworksArray}
          imageBaseUrl={imageBaseUrl}
        />
        <div className="flex-center">
          <ArtworksPaginationButtonsContainer />
        </div>
      </div>
    );
  }
}