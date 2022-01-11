import * as APIUtil from '../util/userAPIUtil';

export const RECEIVE_USERS = 'RECEIVE_USERS';
export const RECEIVE_USER = 'RECEIVE_USER';
export const RESET_USERS = 'RESET_USERS';
export const RESET_USER = 'RESET_USER';

export const receiveUsers = response => ({
  type: RECEIVE_USERS,
  response,
});

export const receiveUser = response => ({
  type: RECEIVE_USER,
  response,
});

export const resetUsers = () => ({
  type: RESET_USERS,
});

export const resetUser = () => ({
  type: RESET_USER,
});

export const fetchUsers = () => dispatch => {
  dispatch(resetUsers());
  APIUtil.fetchUsers().then(response => response.json())
    .then(response => (
      dispatch(receiveUsers(response))
    ));
};

export const fetchUser = id => dispatch => {
  dispatch(resetUser());
  APIUtil.fetchUser(id).then(response => response.json())
    .then(response => (
      dispatch(receiveUser(response))
    ));
};