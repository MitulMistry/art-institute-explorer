import {
  RECEIVE_CURRENT_USER,
  LOGOUT_CURRENT_USER,
} from '../actions/sessionActions';

import {
  RECEIVE_ARTWORK_SAVE,
  REMOVE_ARTWORK_SAVE
} from '../actions/artworkSaveActions';

import {
  RECEIVE_COLLECTION_LIKE,
  REMOVE_COLLECTION_LIKE
} from '../actions/collectionLikeActions';

const initialState = {
  id: null,
  savedArtworksAicIds: [],
  likedCollectionsIds: []
};

const sessionReducer = (state = initialState, action) => {
  let nextState;
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      nextState = Object.assign({}, initialState);
      nextState.id = action.currentUser.id;
      nextState.savedArtworksAicIds = action.currentUser.saved_artworks_aic_ids;
      nextState.likedCollectionsIds = action.currentUser.liked_collections_ids;
      return nextState;
    case LOGOUT_CURRENT_USER:
      return initialState;
    case RECEIVE_ARTWORK_SAVE:
      nextState = Object.assign({}, state);
      nextState.savedArtworksAicIds.push(action.artworkSave.aic_id);
    case REMOVE_ARTWORK_SAVE:
      nextState = Object.assign({}, state);
      let artworkIds = nextState.savedArtworksAicIds;
      const artworkIndex = artworkIds.indexOf(action.aic_id);
      if (artworkIndex > -1) {
        artworkIds.splice(artworkIndex, 1);
        nextState.savedArtworksAicIds = artworkIds;
      }
      return nextState;
    case RECEIVE_COLLECTION_LIKE:
      nextState = Object.assign({}, state);
      nextState.likedCollectionsIds.push(action.collectionLike.collection_id);
      return nextState;
    case REMOVE_COLLECTION_LIKE:
      nextState = Object.assign({}, state);
      let collectionIds = nextState.likedCollectionsIds;
      const collectionIndex = collectionIds.indexOf(action.collection_id);
      if (collectionIndex > -1) {
        collectionIds.splice(collectionIndex, 1);
        nextState.likedCollectionsIds = collectionIds;
      }
      return nextState;
    default:
      return state;
  }
};

export default sessionReducer;