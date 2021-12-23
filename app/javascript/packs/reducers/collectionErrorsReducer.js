import {
  RECEIVE_COLLECTION_ERRORS,
  RESET_COLLECTION_ERRORS,
  RECEIVE_COLLECTION,
} from '../actions/collectionActions';

const initialState = [];

const collectionErrorsReducer = (state = initialState, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_COLLECTION_ERRORS:
      return action.errors;
    case RECEIVE_COLLECTION:
      return initialState;
    case RESET_COLLECTION_ERRORS:
      return initialState;
    default:
      return state;
  }
}

export default collectionErrorsReducer;