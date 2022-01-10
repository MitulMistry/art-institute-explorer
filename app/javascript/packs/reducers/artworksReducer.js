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
  artworksArrayCurrentPage: 1,
  artworksArrayTotalPages: 1,
  savedArtworksArray: [],
  savedArtworksCurrentPage: 1,
  savedArtworksTotalPages: 1,
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
      if (!('config' in action.response)) {
        nextState.artworksArrayResponse.config = initialState.artworksArrayResponse.config;        
      }
      if ('pagination' in action.response) {
        nextState.artworksArrayCurrentPage = action.response.pagination.current_page;
        nextState.artworksArrayTotalPages = action.response.pagination.total_pages;
      }
      return nextState;
    case RECEIVE_SAVED_ARTWORKS:
      nextState = Object.assign({}, state);
      nextState.savedArtworksArray = action.response.artworks;
      nextState.savedArtworksCurrentPage = action.response.pages.current_page;
      nextState.savedArtworksTotalPages = action.response.pages.total_pages;
      return nextState;
    case RECEIVE_ARTWORK:
      nextState = Object.assign({}, state);
      nextState.artworkShow = action.response.data;
      nextState.artworkShowResponse = action.response;
      delete nextState.artworkShowResponse.data;
      if (!('config' in action.response)) {
        nextState.artworkShowResponse.config = initialState.artworkShowResponse.config;
      }
      return nextState;
    default:
      return state;
  }
}

export default artworksReducer;