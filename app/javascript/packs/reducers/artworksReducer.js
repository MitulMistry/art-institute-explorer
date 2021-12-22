import {
  RECEIVE_ARTWORKS,
  RECEIVE_SAVED_ARTWORKS,
  RECEIVE_ARTWORK
} from '../actions/artworkActions';

const initialState = {
  artworksArray: [],
  artworksArrayResponse: {
    config: {
      iiif_url: null
    }
  },
  savedArtworksArray: [],
  artworkShow: null,
  artworkShowResponse: {
    config: {
      iiif_url: null
    }
  }
};

const artworksReducer = (state = initialState, action) => {
  let nextState;
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_ARTWORKS:
      nextState = Object.assign({}, state);
      nextState.artworksArray = action.response.data;
      nextState.artworksArrayResponse = action.response;
      delete nextState.artworksArrayResponse.data;
      return nextState;
    case RECEIVE_SAVED_ARTWORKS:
      nextState = Object.assign({}, state);
      nextState.savedArtworksArray = action.artworks;
      return nextState;
    case RECEIVE_ARTWORK:
      nextState = Object.assign({}, state);
      nextState.artworkShow = action.response.data;
      nextState.artworkShowResponse = action.response;
      delete nextState.artworkShowResponse.data;
      return nextState;
    default:
      return state;
  }
}

export default artworksReducer;