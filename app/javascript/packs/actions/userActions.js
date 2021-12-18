import * as APIUtil from '../util/userAPIUtil';

export const RECEIVE_USERS = 'RECEIVE_USERS';
export const RECEIVE_USER = 'RECEIVE_USER';

export const receiveUsers = response => ({
  type: RECEIVE_USERS,
  response,
});

export const receiveUser = response => ({
  type: RECEIVE_USER,
  response,
});

export const fetchUsers = () => dispatch => (
  APIUtil.fetchUsers().then(response => response.json())
    .then(response => (
      dispatch(receiveUsers(response))
    ))
);

export const fetchUser = id => dispatch => (
  APIUtil.fetchUser(id).then(response => response.json())
    .then(response => (
      dispatch(receiveUser(response))
    ))
);