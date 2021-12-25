import {
  RECEIVE_CURRENT_USER,
  LOGOUT_CURRENT_USER } from '../actions/sessionActions';

import {
  RECEIVE_USERS,
  RECEIVE_USER,
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
      return nextState;
    case LOGOUT_CURRENT_USER:
      nextState = Object.assign({}, state);
      nextState.currentUser = initialState.currentUser;
      return nextState;
    case RECEIVE_USERS:
      nextState = Object.assign({}, state);
      nextState.usersArray = action.response;
      return nextState;
    case RECEIVE_USER:
      nextState = Object.assign({}, state);
      nextState.userShow = action.response;
      return nextState;
    default:
      return state;
  }
}

export default usersReducer;