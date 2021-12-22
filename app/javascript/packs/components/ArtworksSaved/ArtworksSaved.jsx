import React from 'react';
import { ArtworksGrid } from '../ArtworksIndex/ArtworksGrid'; 

export class ArtworksSaved extends React.Component {
  componentDidMount() {
    // Dispatch Redux action to fetch Artworks via API call
    const { fetchSavedArtworks } = this.props;
    fetchSavedArtworks();
  }

  render() {
    const { savedArtworksArray } = this.props;

    let artworks = null;
    if (savedArtworksArray && savedArtworksArray.length > 0 ) {
      artworks = (
        <ArtworksGrid
          artworksArray={savedArtworksArray}
          imageBaseUrl={savedArtworksArray[0].image_url_prefix}
        />
      );
    } else {
      artworks = (
        <p>No artworks currently saved.</p>
      );
    }

    return (
      <div className="artworks-index">
        <h1 className="header-ruler">Saved Artworks</h1>
        {artworks}
      </div>
    );
  }
}