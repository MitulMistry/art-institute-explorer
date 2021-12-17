import React from 'react';
import Placeholder_Image from 'images/No-Image-Placeholder.png';

export class ArtworkImage extends React.Component {
  render() {
    const { artwork, imageBaseUrl } = this.props;
    
    let image = null;
    let altText = null;

    // altText is stored in nested thumbnail key for AIC API calls, but
    // stored in alt_text key for internal API calls for saved Artworks.
    if ("thumbnail" in artwork) {
      altText = artwork.thumbnail.alt_text;
    } else if ("alt_text" in artwork) {
      altText = artwork.alt_text
    }
    
    // Check if image is available, otherwise use placeholder.
    if (artwork.image_id) {
      image = (
        <img src={`${imageBaseUrl}/${artwork.image_id || 0}/full/843,/0/default.jpg`} 
          alt={altText || "Artwork"} className="artwork-image" />
      );
    } else {
      image = (
        <img src={Placeholder_Image} 
          alt="Placeholder image" className="artwork-image" />
      );
    }

    return (
      <span>
        {image}
      </span>
    );
  }
}