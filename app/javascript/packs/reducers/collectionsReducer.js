import {
  RECEIVE_COLLECTIONS,
  RECEIVE_COLLECTION
} from '../actions/collectionActions';

import {
  RECEIVE_COLLECTION_COMMENT,
  DELETE_COLLECTION_COMMENT
} from '../actions/collectionCommentActions'

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
    case DELETE_COLLECTION_COMMENT:
      nextState = Object.assign({}, state);
      // Create new array of comments that don't match the id that needs to be removed
      let commentArray = nextState.collectionShow.collection_comments.filter((comment) => (
        comment.id !== action.collectionCommentId
      ));
      nextState.collectionShow.collection_comments = commentArray;
      return nextState;
    default:
      return state;
  }
}

export default collectionsReducer;