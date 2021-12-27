import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp as faThumbsUpRegular } from '@fortawesome/free-regular-svg-icons'
import { faThumbsUp as faThumbsUpSolid } from '@fortawesome/free-solid-svg-icons'

export class CollectionLikeButton extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   liked: false
    // };
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.handleUnlike = this.handleLike.bind(this);
  }

  // componentDidMount() {
  //   const { loggedIn, likedCollectionIds, collection } = this.props;

  //   if (loggedIn && likedCollectionIds && likedCollectionIds.includes(collection.id)) {
  //     this.setState({liked: true});
  //   }
  // }

  // handleSubmit(e) {
  //   this.setState({liked: !this.state.liked});
  // }

  handleLike(e) {
    const { collection, createCollectionLike } = this.props;
    createCollectionLike(collection.id);
  }

  handleUnlike(e) {
    const { collection, deleteCollectionLike } = this.props;
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
            <p className="like-count-selected">{collection.like_count}</p>
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
            <p className="like-count">{collection.like_count}</p>
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
        <p className="like-count">{collection.like_count}</p>
        </div>
      );
    }

    return (
      button
    );
  }
}