import {
  RECEIVE_SESSION_ERRORS,
  RESET_SESSION_ERRORS,
  RECEIVE_CURRENT_USER,
} from '../actions/sessionActions';

const initialState = [];

const sessionErrorsReducer = (state = initialState, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_SESSION_ERRORS:
      return action.errors;
    case RECEIVE_CURRENT_USER:
      return initialState;
    case RESET_SESSION_ERRORS:
      return initialState;
    default:
      return state;
  }
}

export default sessionErrorsReducer;