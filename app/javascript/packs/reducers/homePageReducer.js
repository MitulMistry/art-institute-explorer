import {
  RECEIVE_MIXED_DATA_INDEX
} from '../actions/mixedDataActions';

const initialState = {
  artworksArray: [],
  artworksArrayResponse: {
    config: {
      iiif_url: null
    }
  },
  collectionsArray: []
};

const homePageReducer = (state = initialState, action) => {
  let nextState;
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_MIXED_DATA_INDEX:
      nextState = Object.assign({}, state);
      nextState.artworksArray = action.response.artworks;
      nextState.artworksArrayResponse = action.response.artworks_response;
      if (!('config' in nextState.artworksArrayResponse)) {
        nextState.artworksArrayResponse.config = initialState.artworksArrayResponse.config;
      }
      nextState.collectionsArray = action.response.collections;
      return nextState;
    default:
      return state;
  }
}

export default homePageReducer;
