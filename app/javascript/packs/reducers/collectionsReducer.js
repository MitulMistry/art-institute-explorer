import {
  RECEIVE_COLLECTIONS,
  RECEIVE_COLLECTION
} from '../actions/collectionActions';

const initialState = {
  collectionsArray: [],
  collectionsCurrentPage: 1,
  collectionsTotalPages: 1,
  collectionShow: null
};

const collectionsReducer = (state = initialState, action) => {
  let nextState;
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_COLLECTIONS:
      nextState = Object.assign({}, state);
      nextState.collectionsArray = action.response.collections;
      nextState.collectionsCurrentPage = action.response.pages.current_page;
      nextState.collectionsTotalPages = action.response.pages.total_pages;
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