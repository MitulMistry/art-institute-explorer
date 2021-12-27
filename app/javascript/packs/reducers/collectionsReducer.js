import {
  RECEIVE_COLLECTIONS,
  RECEIVE_COLLECTION
} from '../actions/collectionActions';

import {
  RECEIVE_COLLECTION_COMMENT,
  REMOVE_COLLECTION_COMMENT
} from '../actions/collectionCommentActions';

import {
  RECEIVE_COLLECTION_LIKE,
  REMOVE_COLLECTION_LIKE
} from '../actions/collectionLikeActions';

const initialState = {
  collectionsArray: [],
  collectionShow: null
};

const collectionsReducer = (state = initialState, action) => {
  let nextState;
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_COLLECTIONS:
      nextState = Object.assign({}, state);
      nextState.collectionsArray = action.response;
      return nextState;
    case RECEIVE_COLLECTION:
      nextState = Object.assign({}, state);
      nextState.collectionShow = action.response;
      return nextState;
    case RECEIVE_COLLECTION_COMMENT:
      nextState = Object.assign({}, state);
      nextState.collectionShow.collection_comments.push(action.collectionComment);
      return nextState;
    case REMOVE_COLLECTION_COMMENT:
      nextState = Object.assign({}, state);
      // Create new array of comments that don't match the id that needs to be removed
      let commentArray = nextState.collectionShow.collection_comments.filter((comment) => (
        comment.id !== action.collectionCommentId
      ));
      nextState.collectionShow.collection_comments = commentArray;
      return nextState;
    case RECEIVE_COLLECTION_LIKE:
      nextState = Object.assign({}, state);
      const receiveLikeCollectionId = action.collectionLike.collection_id;
      const newLikeCountReceived = action.collectionLike.collection_like_count;
      
      if (nextState.collectionShow.id === receiveLikeCollectionId) {
        nextState.collectionShow.like_count = newLikeCountReceived;
      }
      const receiveLikeIndex = nextState.collectionsArray.findIndex(
        collection => (collection.id === receiveLikeCollectionId)
      );
      if (receiveLikeIndex > -1) {
        nextState.collectionsArray[receiveLikeIndex].like_count = newLikeCountReceived;
      }      
      return nextState;
    case REMOVE_COLLECTION_LIKE:
      const removeLikeCollectionId = action.collectionLike.collection_id;
     
      if (nextState.collectionShow.id === removeLikeCollectionId) {
        nextState.collectionShow.like_count--;
      }
      const removeLikeIndex = nextState.collectionsArray.findIndex(
        collection => (collection.id === removeLikeCollectionId)
      );
      if (removeLikeIndex > -1) {
        nextState.collectionsArray[removeLikeIndex].like_count--;
      }   
      return nextState;
    default:
      return state;
  }
}

export default collectionsReducer;