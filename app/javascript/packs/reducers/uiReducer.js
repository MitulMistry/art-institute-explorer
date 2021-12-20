import {
  SET_REDIRECT,
  RESET_REDIRECT,
} from '../actions/uiActions';

const initialState = {
  redirect: null
};

const uiReducer = (state = initialState, action) => {
  let nextState;
  Object.freeze(state);

  switch (action.type) {
    case SET_REDIRECT:
      nextState = Object.assign({}, state);
      nextState.redirect = action.path;
      return nextState;
    case RESET_REDIRECT:
      nextState = Object.assign({}, state);
      nextState.redirect = null;
      return nextState;
    default:
      return state;
  }
}

export default uiReducer;