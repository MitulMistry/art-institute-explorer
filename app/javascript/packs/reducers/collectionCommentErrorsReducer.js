import {
  RECEIVE_COLLECTION_COMMENT_ERRORS,
  RECEIVE_COLLECTION_COMMENT,
  RESET_COLLECTION_COMMENT_ERRORS
} from '../actions/collectionCommentActions';

const initialState = [];

const collectionCommentErrorsReducer = (state = initialState, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_COLLECTION_COMMENT_ERRORS:
      return action.errors;
    case RECEIVE_COLLECTION_COMMENT:
      return initialState;
    case RESET_COLLECTION_COMMENT_ERRORS:
      return initialState;
    default:
      return state;
  }
}

export default collectionCommentErrorsReducer;