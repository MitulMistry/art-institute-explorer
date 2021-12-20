import * as APIUtil from '../util/sessionAPIUtil';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';

export const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});

export const logoutCurrentUser = () => ({
  type: LOGOUT_CURRENT_USER,
});

export const receiveErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
});

export const signUp = user => dispatch => (
  APIUtil.signUp(user).then(response => response.json())
  .then(user => (
    dispatch(receiveCurrentUser(user))
  )).catch(errors => (
    dispatch(receiveErrors(errors))
  ))
);

export const editProfile = user => dispatch => (
  APIUtil.editProfile(user).then(response => response.json())
  .then(user => (
    dispatch(receiveCurrentUser(user))
  )).catch(errors => (
    dispatch(receiveErrors(errors))
  ))
);

export const login = user => dispatch => (
  APIUtil.login(user).then(response => response.json())
  .then(user => (
    dispatch(receiveCurrentUser(user))
  )).catch(errors => (
    dispatch(receiveErrors(errors))
  ))
);

export const logout = () => dispatch => (
  APIUtil.logout().then(response => response.json())
  .then(user => (
    dispatch(logoutCurrentUser())
  ))
);
