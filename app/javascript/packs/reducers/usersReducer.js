import { RECEIVE_CURRENT_USER } from '../actions/sessionActions';

import {
  RECEIVE_USERS,
  RECEIVE_USER
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
      nextState.currentUser = action.currentUser;
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