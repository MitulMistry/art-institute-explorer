import * as APIUtil from '../util/collectionAPIUtil';

export const RECEIVE_COLLECTIONS = 'RECEIVE_COLLECTIONS';
export const RECEIVE_COLLECTION = 'RECEIVE_COLLECTION';

export const receiveCollections = response => ({
  type: RECEIVE_COLLECTIONS,
  response,
});

export const receiveCollection = response => ({
  type: RECEIVE_COLLECTION,
  response,
});

export const fetchCollections = () => dispatch => (
  APIUtil.fetchCollections().then(response => response.json())
    .then(response => (
      dispatch(receiveCollections(response))
    ))
);

export const fetchCollection = id => dispatch => (
  APIUtil.fetchCollection(id).then(response => response.json())
    .then(response => (
      dispatch(receiveCollection(response))
    ))
);