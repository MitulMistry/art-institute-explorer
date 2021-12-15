import React from 'react';
import { ArtworkCard } from './ArtworkCard';

export class ArtworksIndex extends React.Component {
  componentDidMount() {
    const { fetchArtworks } = this.props;
    fetchArtworks();
  }

  render() {
    const { artworksArray, image_base_url } = this.props;
    if (artworksArray.length > 0 && image_base_url) {
      return (
        <div className="artworks-index">
          <h1 className="header-ruler">Artworks</h1>
          <div className="cards-container">
            {artworksArray.map((artwork, i) =>
              <ArtworkCard
                key={i}
                artwork={artwork}
                image_base_url={image_base_url}
              />
            )}
          </div>
        </div>
      );
    } else {
      return (
        <div className="artworks-index">
          <p>Loading...</p>
        </div>
      );
    }
  }
}