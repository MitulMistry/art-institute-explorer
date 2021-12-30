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

import {
  RECEIVE_OWNED_COLLECTIONS
} from '../actions/collectionActions';

const initialState = {
  id: null,
  savedArtworksAicIds: [],
  likedCollectionsIds: [],
  ownedCollections: []
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
      let receiveSaveArray = nextState.savedArtworksAicIds;

      // Arrays must be copied in order to trigger re-render in Redux Connect
      receiveSaveArray.push(action.artworkSave.aic_id);
      nextState.savedArtworksAicIds = [...receiveSaveArray];

      return nextState;
    case REMOVE_ARTWORK_SAVE:
      nextState = Object.assign({}, state);
      let removeSaveArray = nextState.savedArtworksAicIds;

      const artworkIndex = removeSaveArray.indexOf(action.aic_id);
      if (artworkIndex > -1) {
        removeSaveArray.splice(artworkIndex, 1);
        nextState.savedArtworksAicIds = [...removeSaveArray];
      }

      return nextState;
    case RECEIVE_COLLECTION_LIKE:
      nextState = Object.assign({}, state);      
      let receiveLikeArray = nextState.likedCollectionsIds;

      receiveLikeArray.push(action.collectionLike.collection_id);
      nextState.likedCollectionsIds = [...receiveLikeArray];

      return nextState;
    case REMOVE_COLLECTION_LIKE:
      nextState = Object.assign({}, state);
      let removeLikeArray = nextState.likedCollectionsIds;

      const collectionIndex = removeLikeArray.indexOf(action.collection_id);
      if (collectionIndex > -1) {
        removeLikeArray.splice(collectionIndex, 1);
        nextState.likedCollectionsIds = [...removeLikeArray];
      }

      return nextState;
    case RECEIVE_OWNED_COLLECTIONS:
      nextState = Object.assign({}, state);
      nextState.ownedCollections = action.response;
      return nextState;
    default:
      return state;
  }
};

export default sessionReducer;