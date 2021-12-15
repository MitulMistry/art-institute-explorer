import React from 'react';
import { Artwork } from './Artwork';

export class ArtworksIndex extends React.Component {
  componentDidMount() {
    const { fetchArtworks } = this.props;
    fetchArtworks();
  }

  render() {
    const { artworksArray } = this.props;
    if (artworksArray) {
      return (
        <div className="artworks-index">
          <h1>Artworks</h1>
          <div className="cards-container">
            {artworksArray.map((artwork, i) =>
              <Artwork
                key={i}
                artwork={artwork}
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