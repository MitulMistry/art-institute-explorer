import {
  RECEIVE_COLLECTIONS,
  RECEIVE_COLLECTION
} from '../actions/collectionActions';

import {
  RECEIVE_COLLECTION_COMMENT,
  REMOVE_COLLECTION_COMMENT
} from '../actions/collectionCommentActions';

const initialState = {
  collectionCommentsArray: []
};

const collectionCommentsReducer = (state = initialState, action) => {
  let nextState;
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_COLLECTION:
      nextState = Object.assign({}, state);
      nextState.collectionCommentsArray = [...action.response.collection_comments];
      return nextState;
    case RECEIVE_COLLECTION_COMMENT:
      nextState = Object.assign({}, state);
      // Arrays must be copied in order to trigger re-render in Redux Connect
      const receiveCommentArray = [...nextState.collectionCommentsArray]
      receiveCommentArray.push(action.collectionComment);
      nextState.collectionCommentsArray = receiveCommentArray;
      return nextState;
    case REMOVE_COLLECTION_COMMENT:
      nextState = Object.assign({}, state);
      // Create new array of comments that don't match the id that needs to be removed
      const oldRemoveCommentArray = [...nextState.collectionCommentsArray];
      let newRemoveCommentArray = oldRemoveCommentArray.filter(comment => (
        comment.id !== action.collectionCommentId
      ));
      nextState.collectionCommentsArray = newRemoveCommentArray;
      return nextState;
    default:
      return state;
  }
}

export default collectionCommentsReducer;