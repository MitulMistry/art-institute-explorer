import React from 'react';
import { Link } from 'react-router-dom';
import { ArtworkImage } from '../ArtworksIndex/ArtworkImage';

export class CollectionCard extends React.Component {
  render() {
    const { collection } = this.props;

    // Select first Artwork in Collection to use as image, or
    // else provide an empty object to trigger a placeholder image.
    let image = null;
    if (collection.artworks.length > 0) {
      image = (
        <Link to={`/collections/${collection.id}`}>
          <ArtworkImage
            artwork={collection.artworks[0]}
            imageBaseUrl={collection.artworks[0].image_url_prefix}
          />
        </Link>
      )
    } else {
      const emptyArtwork = {};
      image = (
        <Link to={`/collections/${collection.id}`}>
          <ArtworkImage
            artwork={emptyArtwork}
          />
        </Link>
      )
    }

    let userInfo = null;
    if ("user" in collection && collection.user.id) {
      userInfo = (
        <p className="collection-card-user">
          <Link to={`/users/${collection.user.id}`}>{collection.user.username}</Link>
        </p>
      );
    }

    return (
      <div className="collection-card masonry-item">
        {image}
        <h5 className="collection-card-title">
          <Link to={`/collections/${collection.id}`}>{collection.title}</Link>
        </h5>
        {userInfo}
      </div>
    );
  }
}