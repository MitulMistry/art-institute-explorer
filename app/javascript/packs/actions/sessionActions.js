import * as APIUtil from '../util/sessionAPIUtil';
import { setRedirect } from './uiActions';

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
  APIUtil.signUp(user).then(response => {
    if (!response.ok) {
      return Promise.reject(response);
    } else {
      return response.json();
    }
  })
  .then(user => {
    dispatch(receiveCurrentUser(user));
    dispatch(setRedirect('/artworks'));
  }).catch(errors => {
    console.log(errors);
    dispatch(receiveErrors(errors))
  })
);

export const editProfile = user => dispatch => (
  APIUtil.editProfile(user).then(response => response.json())
  .then(user => {
    dispatch(receiveCurrentUser(user))
    dispatch(setRedirect(`/users/${user.id}`))
  }).catch(errors => (
    dispatch(receiveErrors(errors))
  ))
);

export const login = user => dispatch => (
  APIUtil.login(user).then(response => response.json())
  .then(user => {
    dispatch(receiveCurrentUser(user))
    dispatch(setRedirect('/artworks'))
  }).catch(errors => (
    dispatch(receiveErrors(errors))
  ))
);

export const logout = () => dispatch => (
  APIUtil.logout().then(response => response.json())
  .then(user => {
    dispatch(logoutCurrentUser())
    dispatch(setRedirect('/'))
  })
);
