import * as APIUtil from '../util/collectionAPIUtil';
import { processResponse } from '../util/APIRequestHelpers';

export const RECEIVE_COLLECTIONS = 'RECEIVE_COLLECTIONS';
export const RECEIVE_COLLECTION = 'RECEIVE_COLLECTION';
export const RECEIVE_COLLECTION_ERRORS = 'RECEIVE_COLLECTION_ERRORS';
export const RESET_COLLECTION_ERRORS = 'RESET_COLLECTION_ERRORS';

export const receiveCollections = response => ({
  type: RECEIVE_COLLECTIONS,
  response,
});

export const receiveCollection = response => ({
  type: RECEIVE_COLLECTION,
  response,
});

export const receiveCollectionErrors = errors => ({
  type: RECEIVE_COLLECTION_ERRORS,
  errors,
});

export const resetCollectionErrors = errors => ({
  type: RESET_COLLECTION_ERRORS,
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

export const createCollection = collection => dispatch => (
  APIUtil.createCollection(collection).then(response => processResponse(response))
  .then(collection => (
    dispatch(receiveCollection(collection))
  )).catch(errors => (
    dispatch(receiveCollectionErrors(errors))
  ))
);

export const updateCollection = collection => dispatch => (
  APIUtil.updateCollection(collection).then(response => processResponse(response))
  .then(collection => (
    dispatch(receiveCollection(collection))
  )).catch(errors => (
    dispatch(receiveCollectionErrors(errors))
  ))
);
