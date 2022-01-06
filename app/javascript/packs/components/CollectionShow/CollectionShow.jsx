import React from 'react';
import { Link } from 'react-router-dom';
import { ArtworkCard } from '../ArtworksIndex/ArtworkCard';
import { CollectionCommentsGrid } from '../CollectionComment/CollectionCommentsGrid';
import CollectionCommentNewContainer from '../CollectionCommentNew/CollectionCommentNewContainer';
import CollectionLikeButtonContainer from '../CollectionsIndex/CollectionLikeButtonContainer';
import { LoadingSpinner } from '../elements/LoadingSpinner';
import DeleteCollectionButtonContainer from './DeleteCollectionButtonContainer';

export class CollectionShow extends React.Component {
  componentDidMount() {
    // Dispatch Redux action to fetch Collection via API call
    const { fetchCollection, collectionId } = this.props;
    fetchCollection(collectionId);
  }

  render() {
    const { collectionShow, collectionId, collectionComments, loggedIn, owned} = this.props;

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
              commentsArray={collectionComments}
            />
          </div>
        );
      }

      let modifyButtons = null;
      if (owned) {
        modifyButtons = (
          <p>
            <Link to="edit">
              <button className="btn-primary-small">Edit</button>
            </Link>
            <DeleteCollectionButtonContainer id={collectionId} />
          </p>
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
            <div className="flex-row">
              <div className="flex-row-left">
                <h1>{collectionShow.title}</h1>
                <p>By: <Link to={`/users/${collectionShow.user.id}`}>{collectionShow.user.username}</Link></p>
                <p>{collectionShow.description}</p>
                {modifyButtons}
              </div>
              <div className="flex-row-right">
                <div className="collection-show-like-button">
                  <CollectionLikeButtonContainer
                    collection={collectionShow}
                  />
                </div>
              </div>
            </div>
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