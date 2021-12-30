import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'

export class ArtworkSaveButton extends React.Component {
  constructor(props) {
    super(props);

    this.handleSave = this.handleSave.bind(this);
    this.handleUnsave = this.handleUnsave.bind(this);
  }

  handleSave(e) {
    const { aic_id, createArtworkSave } = this.props;
    createArtworkSave(aic_id);
  }

  handleUnsave(e) {
    const { aic_id, deleteArtworkSave } = this.props;
    deleteArtworkSave(aic_id);
  }

  render() {
    const { loggedIn, savedArtworksAicIds, aic_id } = this.props;
    
    let button = null;
    if (loggedIn && savedArtworksAicIds) {
      if (savedArtworksAicIds.includes(aic_id)) {
        button = (
          <div className="btn-interactive-save">
            <FontAwesomeIcon
              icon={faHeartSolid}
              size="1x"
              className="btn-interactive-selected"
              onClick={this.handleUnsave}
              title="Unsave artwork"
            />
          </div>
        );
      } else {
        button = (
          <div className="btn-interactive-save">
            <FontAwesomeIcon
              icon={faHeartRegular}
              size="1x"
              className="btn-interactive"
              onClick={this.handleSave}
              title="Save artwork"
            />
          </div>
        );
      }
    }

    return (
      button
    );
  }
}