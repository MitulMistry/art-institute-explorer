import * as APIUtil from '../util/collectionAPIUtil';
import { setRedirect } from './uiActions';
import { processResponse } from '../util/APIRequestHelpers';

export const RECEIVE_COLLECTIONS = 'RECEIVE_COLLECTIONS';
export const RECEIVE_COLLECTION = 'RECEIVE_COLLECTION';
export const RECEIVE_OWNED_COLLECTIONS = 'RECEIVE_OWNED_COLLECTIONS';
export const RECEIVE_COLLECTION_ERRORS = 'RECEIVE_COLLECTION_ERRORS';
export const RESET_COLLECTION_ERRORS = 'RESET_COLLECTION_ERRORS';
export const RESET_COLLECTIONS = 'RESET_COLLECTIONS';
export const RESET_COLLECTION = 'RESET_COLLECTION';

export const receiveCollections = response => ({
  type: RECEIVE_COLLECTIONS,
  response,
});

export const receiveCollection = response => ({
  type: RECEIVE_COLLECTION,
  response,
});

export const receiveOwnedCollections = response => ({
  type: RECEIVE_OWNED_COLLECTIONS,
  response,
});

export const receiveCollectionErrors = errors => ({
  type: RECEIVE_COLLECTION_ERRORS,
  errors,
});

export const resetCollectionErrors = () => ({
  type: RESET_COLLECTION_ERRORS,
});

export const resetCollections = () => ({
  type: RESET_COLLECTIONS,
});

export const resetCollection = () => ({
  type: RESET_COLLECTION,
});

export const fetchCollections = page => dispatch => {
  dispatch(resetCollections());
  APIUtil.fetchCollections(page).then(response => response.json())
    .then(response => (
      dispatch(receiveCollections(response))
    ));
};

export const fetchCollection = id => dispatch => {
  dispatch(resetCollection());
  APIUtil.fetchCollection(id).then(response => response.json())
    .then(response => (
      dispatch(receiveCollection(response))
    ));
};

export const fetchOwnedCollections = () => dispatch => (
  APIUtil.fetchOwnedCollections().then(response => response.json())
    .then(response => (
      dispatch(receiveOwnedCollections(response))
    ))
);

export const createCollection = collection => dispatch => (
  APIUtil.createCollection(collection).then(response => processResponse(response))
    .then(collection => {
      dispatch(receiveCollection(collection));
      dispatch(setRedirect(`/collections/${collection.id}`));
    }).catch(errors => (
      dispatch(receiveCollectionErrors(errors))
    ))
);

export const updateCollection = collection => dispatch => (
  APIUtil.updateCollection(collection).then(response => processResponse(response))
    .then(collection => {
      dispatch(receiveCollection(collection));
      dispatch(setRedirect(`/collections/${collection.id}`));
    }).catch(errors => (
      dispatch(receiveCollectionErrors(errors))
    ))
);

export const deleteCollection = id => dispatch => (
  APIUtil.deleteCollection(id)
);