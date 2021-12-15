import React from 'react';

export const Artwork = ({ artwork }) => {
  return (
    <div className="artwork-card">
      <h5>{artwork.title}</h5>
      <p className="artwork-artist">{artwork.artist_title}</p>
    </div>
  );
};