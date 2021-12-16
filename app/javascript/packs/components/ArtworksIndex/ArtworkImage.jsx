import React from 'react';
import Placeholder_Image from 'images/No-Image-Placeholder.png';

export class ArtworkImage extends React.Component {
  render() {
    const { artwork, imageBaseUrl } = this.props;

    // Check if image is available, otherwise use placeholder.
    let image = null;
    if (artwork.image_id && artwork.thumbnail.alt_text) {
      image = (
        <img src={`${imageBaseUrl}/${artwork.image_id || 0}/full/843,/0/default.jpg`} 
          alt={artwork.thumbnail.alt_text || "Artwork"} className="artwork-image" />
      );
    } else {
      image = (
        <img src={Placeholder_Image} 
          alt="Placeholder image" className="artwork-card-image" />
      );
    }

    return (
      <span>
        {image}
      </span>
    );
  }
}