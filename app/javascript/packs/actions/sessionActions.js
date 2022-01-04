import * as APIUtil from '../util/sessionAPIUtil';
import { setRedirect } from './uiActions';
import { processResponse } from '../util/APIRequestHelpers';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
export const RESET_SESSION_ERRORS = 'RESET_SESSION_ERRORS';

export const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser,
});

export const logoutCurrentUser = () => ({
  type: LOGOUT_CURRENT_USER,
});

export const receiveSessionErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors,
});

export const resetSessionErrors = () => ({
  type: RESET_SESSION_ERRORS,
});

export const signUp = user => dispatch => (
  APIUtil.signUp(user).then(response => processResponse(response))
  .then(user => {
    dispatch(receiveCurrentUser(user));
    dispatch(setRedirect('/artworks'));
  }).catch(errors => (
    dispatch(receiveSessionErrors(errors))
  ))
);

export const editProfile = user => dispatch => (
  APIUtil.editProfile(user).then(response => processResponse(response))
  .then(user => {
    dispatch(receiveCurrentUser(user))
    dispatch(setRedirect(`/users/${user.id}`))
  }).catch(errors => (
    dispatch(receiveSessionErrors(errors))
  ))
);

export const login = user => dispatch => (
  APIUtil.login(user).then(response => processResponse(response))
  .then(user => {
    dispatch(receiveCurrentUser(user));
    dispatch(setRedirect('/artworks'));
  }).catch(errors => (
    dispatch(receiveSessionErrors(errors))
  ))
);

export const logout = () => dispatch => (
  APIUtil.logout().then(response => response.json())
  .then(user => (
    dispatch(logoutCurrentUser())
  ))
);

export const deleteAccount = id => dispatch => (
  APIUtil.deleteAccount(id)
  .then(response => (
    dispatch(logoutCurrentUser())
  ))
);