import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp as faThumbsUpRegular } from '@fortawesome/free-regular-svg-icons';
import { faThumbsUp as faThumbsUpSolid } from '@fortawesome/free-solid-svg-icons';

export class CollectionLikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likeCount: 0
    };

    this.handleLike = this.handleLike.bind(this);
    this.handleUnlike = this.handleUnlike.bind(this);
  }

  componentDidMount() {
    const { collection } = this.props;
    this.setState({likeCount: collection.like_count});
  }

  handleLike(e) {
    const { collection, createCollectionLike } = this.props;
    this.setState(prevState => ({
      likeCount: prevState.likeCount + 1
    }));
    createCollectionLike(collection.id);
  }

  handleUnlike(e) {
    const { collection, deleteCollectionLike } = this.props;
    this.setState(prevState => ({
      likeCount: prevState.likeCount - 1
    }));
    deleteCollectionLike(collection.id);
  }

  render() {
    const { loggedIn, likedCollectionIds, collection } = this.props;
    
    let button = null;
    if (loggedIn && likedCollectionIds) {
      if (likedCollectionIds.includes(collection.id)) {
        button = (
          <div className="btn-interactive-like">
            <FontAwesomeIcon
              icon={faThumbsUpSolid}
              size="1x"
              className="btn-interactive-selected"
              onClick={this.handleUnlike}
            />
            <p className="like-count-selected">{this.state.likeCount}</p>
          </div>
        );
      } else {
        button = (
          <div className="btn-interactive-like">
            <FontAwesomeIcon
              icon={faThumbsUpRegular}
              size="1x"
              className="btn-interactive"
              onClick={this.handleLike}
            />
            <p className="like-count">{this.state.likeCount}</p>
          </div>
        );
      }
    } else {
      button = (
        <div className="btn-interactive-like">
          <FontAwesomeIcon
            icon={faThumbsUpRegular}
            size="1x"
          />
        <p className="like-count">{this.state.likeCount}</p>
        </div>
      );
    }

    return (
      button
    );
  }
}