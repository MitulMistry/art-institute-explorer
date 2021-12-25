import React from 'react';
import { Link } from 'react-router-dom';
import { ArtworkCard } from '../ArtworksIndex/ArtworkCard';
import { CollectionCommentsGrid } from '../CollectionComment/CollectionCommentsGrid';
import CollectionCommentNewContainer from '../CollectionCommentNew/CollectionCommentNewContainer';
import { LoadingSpinner } from '../elements/LoadingSpinner';

export class CollectionShow extends React.Component {
  componentDidMount() {
    // Dispatch Redux action to fetch Collection via API call
    const { fetchCollection, collectionId } = this.props;
    fetchCollection(collectionId);
  }

  render() {
    const { collectionShow, collectionId, loggedIn} = this.props;

    if (collectionShow && collectionShow.id === collectionId) {

      let artworks = null;
      if (collectionShow.artworks.length > 0) {
        artworks = (
          <div className="cards-container masonry-with-columns">
            {collectionShow.artworks.map((artwork, i) =>
              <ArtworkCard
                key={i}
                artwork={artwork}
                imageBaseUrl={artwork.image_url_prefix}
              />
            )}
          </div>
        );
      }

      let comments = null;
      if (collectionShow.collection_comments.length > 0) {
        comments = (
          <div className ="collection-show-comments">
            <h3>Comments</h3>
            <CollectionCommentsGrid
              commentsArray={collectionShow.collection_comments}
            />
          </div>
        );
      }

      let commentForm = null;
      if (loggedIn) {
        commentForm = (
          <div className="new-comment-form">
            <CollectionCommentNewContainer />
          </div>
        );
      }

      return (
        <div className="collection-show">
          <div className="collection-show-description">
            <h1>{collectionShow.title}</h1>
            <p>By: <Link to={`/users/${collectionShow.user.id}`}>{collectionShow.user.username}</Link></p>
            <p>{collectionShow.description}</p>
          </div>
          {artworks}
          {commentForm}
          {comments}
        </div>
      );
    } else {
      return (
        <div className="collection-show">
          <LoadingSpinner />
        </div>
      );
    }
  }
}