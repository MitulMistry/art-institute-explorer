import {
  RECEIVE_USERS,
  RECEIVE_USER
} from '../actions/userActions';

const initialState = {
  usersArray: [],
  userShow: null
};

const usersReducer = (state = initialState, action) => {
  let nextState;
  Object.freeze(state);

  switch (action.type) {
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