import {
  RECEIVE_MIXED_DATA_INDEX
} from '../actions/mixedDataActions';

const initialState = {
  artworksArray: [],
  artworksArrayResponse: null,
  collectionsArray: []
};

const splashPageReducer = (state = initialState, action) => {
  let nextState;
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_MIXED_DATA_INDEX:
      nextState = Object.assign({}, state);
      nextState.artworksArray = action.response.artworks;
      nextState.artworksArrayResponse = action.response.artworks_response;
      nextState.collectionsArray = action.response.collections;
      return nextState;
    default:
      return state;
  }
}

export default splashPageReducer;
