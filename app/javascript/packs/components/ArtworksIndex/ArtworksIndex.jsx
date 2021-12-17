import React from 'react';
import { ArtworkCard } from './ArtworkCard';
import { LoadingSpinner } from '../elements/LoadingSpinner';

export class ArtworksIndex extends React.Component {
  componentDidMount() {
    // Dispatch Redux action to fetch Artworks via API call
    const { fetchArtworks } = this.props;
    fetchArtworks();
  }

  render() {
    const { artworksArray, imageBaseUrl } = this.props;

    if (artworksArray.length > 0 && imageBaseUrl) {
      return (
        <div className="artworks-index">
          <h1 className="header-ruler">Artworks</h1>
          <div className="cards-container masonry-with-columns">
            {artworksArray.map((artwork, i) =>
              <ArtworkCard
                key={i}
                artwork={artwork}
                imageBaseUrl={imageBaseUrl}
              />
            )}
          </div>
        </div>
      );
    } else {
      return (
        <div className="artworks-index">
          <LoadingSpinner />
        </div>
      );
    }
  }
}