import React from 'react';
import { Link } from 'react-router-dom';
import { ArtworkImage } from './ArtworkImage';

export class ArtworkCard extends React.Component {
  render() {
    const { artwork, imageBaseUrl } = this.props;

    return (
      <div className="artwork-card masonry-item">
        <Link to={`/artworks/${artwork.aic_id || artwork.id}`}>
          <ArtworkImage
            artwork={artwork}
            imageBaseUrl={imageBaseUrl}
          />
        </Link>
        <h5 className="artwork-card-title">
          <Link to={`/artworks/${artwork.aic_id || artwork.id}`}>{artwork.title}</Link>
        </h5>
        <p className="artwork-card-artist">{artwork.artist_title}</p>
      </div>
    );
  }
}