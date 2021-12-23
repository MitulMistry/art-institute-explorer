import React from 'react';
import Placeholder_Image from 'images/No-Image-Placeholder.png';

export class ArtworkImage extends React.Component {
  constructor(props) {
    super(props);
    this.setPlaceholder = this.setPlaceholder.bind(this);
  }

  setPlaceholder(e) {
    e.target.src = Placeholder_Image;
    e.target.alt = 'Placeholder image';
  }

  render() {
    const { artwork, imageBaseUrl } = this.props;
    const defaultBaseUrl = "https://www.artic.edu/iiif/2/";
    
    let image = null;
    let altText = null;

    // altText is stored in nested thumbnail key for AIC API calls, but
    // stored in alt_text key for internal API calls for saved Artworks.
    if ("thumbnail" in artwork) {
      if (artwork.thumbnail && "alt_text" in artwork.thumbnail) {
        altText = artwork.thumbnail.alt_text;
      }
    } else if ("alt_text" in artwork) {
      altText = artwork.alt_text
    }
    
    // Check if image is available, otherwise use placeholder.
    if (artwork.image_id) {
      image = (
        <img src={`${imageBaseUrl || defaultBaseUrl}/${artwork.image_id || 0}/full/843,/0/default.jpg`} 
          alt={altText || "Artwork"} className="artwork-image"
          onError={this.setPlaceholder} />
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