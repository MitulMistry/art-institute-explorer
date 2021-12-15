import React from 'react';
import { Link } from 'react-router-dom';

export const ArtworkCard = ({ artwork, image_base_url }) => {
  return (
    <div className="artwork-card">
      <Link to={`${artwork.id}`}>
        <img src={`${image_base_url}/${artwork.image_id}/full/843,/0/default.jpg`} 
          alt={artwork.thumbnail.alt_text} className="artwork-card-image" />
      </Link>
      <h5 className="artwork-card-title">
        <Link to={`${artwork.id}`}>{artwork.title}</Link>
      </h5>
      <p className="artwork-card-artist">{artwork.artist_title}</p>
    </div>
  );
};