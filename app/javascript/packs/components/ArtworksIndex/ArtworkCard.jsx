import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArtworkImage } from './ArtworkImage';
import ArtworkSaveButtonContainer from './ArtworkSaveButtonContainer';
import AddToCollectionButtonContainer from './AddToCollectionButtonContainer';

export class ArtworkCard extends React.Component {
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
    const { artwork, imageBaseUrl } = this.props;

    return (
      <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: this.state.imageLoaded ? 1 : 0 }}
      className="artwork-card masonry-item">
        <Link to={`/artworks/${artwork.aic_id || artwork.id}`}>
          <ArtworkImage
            artwork={artwork}
            imageBaseUrl={imageBaseUrl}
            setImageLoaded={this.setImageLoaded}
          />
        </Link>
        <div className="card-info flex-row">
          <div className="flex-row-left">
            <h5 className="artwork-card-title">
              <Link to={`/artworks/${artwork.aic_id || artwork.id}`}>{artwork.title}</Link>
            </h5>
            <p className="artwork-card-artist">{artwork.artist_title}</p>
          </div>
          <div className="flex-row-right">
            <ArtworkSaveButtonContainer
              aic_id={artwork.aic_id || artwork.id}
            />
            <AddToCollectionButtonContainer
              aic_id={artwork.aic_id || artwork.id}
            />
          </div>
        </div>
      </motion.div>
    );
  }
}