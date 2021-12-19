import React from 'react';
import { ArtworkCard } from './ArtworkCard';
import { LoadingSpinner } from '../elements/LoadingSpinner';

export class ArtworksGrid extends React.Component {
  render() {
    const { artworksArray, imageBaseUrl } = this.props;

    if (artworksArray.length > 0 && imageBaseUrl) {
      return (
        <div className="artworks-grid">          
          <div className="cards-container masonry-with-columns">
            {artworksArray.map((artwork, i) =>
              <ArtworkCard
                key={i}
                artwork={artwork}
                imageBaseUrl={artwork.image_url_prefix || imageBaseUrl}
              />
            )}
          </div>
        </div>
      );
    } else {
      return (
        <div className="artworks-grid">
          <LoadingSpinner />
        </div>
      );
    }
  }
}