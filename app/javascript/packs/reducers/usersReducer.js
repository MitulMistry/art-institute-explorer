import {
  RECEIVE_CURRENT_USER,
  LOGOUT_CURRENT_USER } from '../actions/sessionActions';

import {
  RECEIVE_USERS,
  RECEIVE_USER,
  RESET_USERS,
  RESET_USER
} from '../actions/userActions';

const initialState = {
  currentUser: null,
  usersArray: [],
  userShow: null
};

const usersReducer = (state = initialState, action) => {
  let nextState;
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      nextState = Object.assign({}, state);
      let currentUser = Object.assign({}, action.currentUser);
      nextState.currentUser = currentUser;
      if ("saved_artworks_aic_ids" in nextState.currentUser) {
        delete nextState.currentUser.saved_artworks_aic_ids;
      }
      if ("liked_collections_ids" in nextState.currentUser) {
        delete nextState.currentUser.liked_collections_ids;
      }
      return nextState;
    case LOGOUT_CURRENT_USER:
      nextState = Object.assign({}, state);
      nextState.currentUser = initialState.currentUser;
      return nextState;
    case RECEIVE_USERS:
      nextState = Object.assign({}, state);
      nextState.usersArray = action.response;
      return nextState;
    case RESET_USERS:
      nextState = Object.assign({}, state);
      nextState.usersArray = initialState.usersArray;
      return nextState;
    case RECEIVE_USER:
      nextState = Object.assign({}, state);
      nextState.userShow = action.response;
      return nextState;
    case RESET_USER:
      nextState = Object.assign({}, state);
      nextState.userShow = initialState.userShow;
      return nextState;
    default:
      return state;
  }
}

export default usersReducer;