import {
  RECEIVE_COLLECTIONS,
  RECEIVE_COLLECTION
} from '../actions/collectionActions';

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
    default:
      return state;
  }
}

export default collectionsReducer;