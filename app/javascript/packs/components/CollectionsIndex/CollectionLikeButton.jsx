import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp as faThumbsUpRegular } from '@fortawesome/free-regular-svg-icons'
import { faThumbsUp as faThumbsUpSolid } from '@fortawesome/free-solid-svg-icons'

export class CollectionLikeButton extends React.Component {
  render() {
    const { collection } = this.props;

    return (
      <div className="btn-interactive-like">
        <FontAwesomeIcon icon={faThumbsUpRegular} size="1x" />
        <p className="like-count">{collection.like_count}</p>
      </div>
    );
  }
}