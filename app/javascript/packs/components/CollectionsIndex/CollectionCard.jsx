import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArtworkImage } from '../ArtworksIndex/ArtworkImage';
import CollectionLikeButtonContainer from './CollectionLikeButtonContainer';

export class CollectionCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageLoaded: false
    };

    this.setImageLoaded = this.setImageLoaded.bind(this);
  }

  setImageLoaded() {
    this.setState({imageLoaded: true});
  }

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
            setImageLoaded={this.setImageLoaded}
          />
        </Link>
      )
    } else {
      const emptyArtwork = {};
      image = (
        <Link to={`/collections/${collection.id}`}>
          <ArtworkImage
            artwork={emptyArtwork}
            setImageLoaded={this.setImageLoaded}
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
      <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: this.state.imageLoaded ? 1 : 0 }}
      className="collection-card masonry-item">
        {image}
        <div className="card-info flex-row">
          <div className="flex-row-left">
            <h5 className="collection-card-title">
              <Link to={`/collections/${collection.id}`}>{collection.title}</Link>
            </h5>
            {userInfo}
          </div>
          <div className="flex-row-right">
            <CollectionLikeButtonContainer
              collection={collection}
            />
          </div>
        </div>
      </motion.div>
    );
  }
}