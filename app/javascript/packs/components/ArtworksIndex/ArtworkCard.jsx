import React from 'react';
import { Link } from 'react-router-dom';
import Placeholder_Image from 'images/No-Image-Placeholder.png';

export class ArtworkCard extends React.Component {
  render() {
    const { artwork, image_base_url } = this.props;

    // Check if image is available, otherwise use placeholder so
    // application doesn't crash.
    let image = null;
    if (artwork.image_id && artwork.thumbnail.alt_text) {
      image = (
        <img src={`${image_base_url}/${artwork.image_id || 0}/full/843,/0/default.jpg`} 
          alt={artwork.thumbnail.alt_text || "Artwork"} className="artwork-card-image" />
      );
    } else {
      image = (
        <img src={Placeholder_Image} 
          alt="Placeholder image" className="artwork-card-image" />
      );
    }

    return (
      <div className="artwork-card">
        <Link to={`${artwork.id}`}>
          {image}
        </Link>
        <h5 className="artwork-card-title">
          <Link to={`${artwork.id}`}>{artwork.title}</Link>
        </h5>
        <p className="artwork-card-artist">{artwork.artist_title}</p>
      </div>
    );
  }
}