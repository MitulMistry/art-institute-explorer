import * as APIUtil from '../util/collectionLikeAPIUtil';
import { processResponse } from '../util/APIRequestHelpers';

export const RECEIVE_COLLECTION_LIKE = 'RECEIVE_COLLECTION_LIKE';
export const REMOVE_COLLECTION_LIKE = 'REMOVE_COLLECTION_LIKE';

export const receiveCollectionLike = collectionLike => ({
  type: RECEIVE_COLLECTION_LIKE,
  collectionLike,
});

export const removeCollectionLike = collection_id => ({
  type: REMOVE_COLLECTION_LIKE,
  collection_id,
});

export const createCollectionLike = collection_id => dispatch => (
  APIUtil.createCollectionLike(collection_id).then(response => processResponse(response))
    .then(collectionLike => {
      dispatch(receiveCollectionLike(collectionLike));
    })
);

export const deleteCollectionLike = collection_id => dispatch => (
  APIUtil.deleteCollectionLike(collection_id)
    .then(response => (
      dispatch(removeCollectionLike(collection_id))
    ))
);