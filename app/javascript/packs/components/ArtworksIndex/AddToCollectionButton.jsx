import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare as faPlusSquareRegular } from '@fortawesome/free-regular-svg-icons'
import { Link } from 'react-router-dom';

export class AddToCollectionButton extends React.Component {
  render() {
    const { loggedIn, aic_id } = this.props;

    if (loggedIn) {
      return (
        <div className="btn-interactive-add">
          <Link to={`/artworks/${aic_id}/add`}>
            <FontAwesomeIcon
              icon={faPlusSquareRegular}
              size="1x"
              className="btn-interactive"
              onClick={this.handleUnlike}
            />
          </Link>
        </div>
      );
    } else {
      return null;
    }
  }
}