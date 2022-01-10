import {
  SET_REDIRECT,
  RESET_REDIRECT,
  SET_SEARCH_QUERY
} from '../actions/uiActions';

const initialState = {
  redirect: null,
  searchQuery: null
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
      nextState.redirect = initialState.redirect;
      return nextState;
    case SET_SEARCH_QUERY:
      nextState = Object.assign({}, state);
      nextState.searchQuery = action.searchQuery;
      return nextState;
    default:
      return state;
  }
}

export default uiReducer;