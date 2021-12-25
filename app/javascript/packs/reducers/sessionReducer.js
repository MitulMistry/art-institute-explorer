import {
  RECEIVE_CURRENT_USER,
  LOGOUT_CURRENT_USER,
} from '../actions/sessionActions';

import {
  RECEIVE_ARTWORK_SAVE,
  REMOVE_ARTWORK_SAVE
} from '../actions/artworkSaveActions';

const initialState = {
  id: null,
  savedArtworksAicIds: []
};

const sessionReducer = (state = initialState, action) => {
  let nextState;
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      nextState = Object.assign({}, initialState);
      nextState.id = action.currentUser.id;
      nextState.savedArtworksAicIds = action.currentUser.saved_artworks_aic_ids;
      return nextState;
    case LOGOUT_CURRENT_USER:
      return initialState;
    case RECEIVE_ARTWORK_SAVE:
      nextState = Object.assign({}, state);
      nextState.savedArtworksAicIds.push(action.artworkSave.aic_id);
    case REMOVE_ARTWORK_SAVE:
      nextState = Object.assign({}, state);
      let ids = nextState.savedArtworksAicIds;
      const index = ids.indexOf(action.aic_id);
      if (index > -1) {
        ids.splice(index, 1);
        nextState.savedArtworksAicIds = ids;
      }      
      return nextState;
    default:
      return state;
  }
};

export default sessionReducer;