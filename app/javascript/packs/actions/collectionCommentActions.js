import * as APIUtil from '../util/collectionCommentAPIUtil';
import { setRedirect } from './uiActions';
import { processResponse } from '../util/APIRequestHelpers';

export const RECEIVE_COLLECTION_COMMENT = 'RECEIVE_COLLECTION_COMMENT';
export const DELETE_COLLECTION_COMMENT = 'DELETE_COLLECTION_COMMENT';
export const RECEIVE_COLLECTION_COMMENT_ERRORS = 'RECEIVE_COLLECTION_COMMENT_ERRORS';
export const RESET_COLLECTION_COMMENT_ERRORS = 'RESET_COLLECTION_COMMENT_ERRORS';

export const receiveCollectionComment = collectionComment => ({
  type: RECEIVE_COLLECTION_COMMENT,
  collectionComment,
});

export const DeleteCollectionComment = collectionCommentId => ({
  type: DELETE_COLLECTION_COMMENT,
  collectionCommentId,
});

export const receiveCollectionCommentErrors = errors => ({
  type: RECEIVE_COLLECTION_COMMENT_ERRORS,
  errors,
});

export const resetCollectionCommentErrors = errors => ({
  type: RESET_COLLECTION_COMMENT_ERRORS,
});

export const createCollectionComment = collectionComment => dispatch => (
  APIUtil.createCollectionComment(collectionComment).then(response => processResponse(response))
    .then(collectionComment => {
      dispatch(receiveCollectionComment(collectionComment));
      dispatch(setRedirect(`/collections/${collectionComment.collection_id}`));
    }).catch(errors => (
      dispatch(receiveCollectionCommentErrors(errors))
    ))
);

export const updateCollectionComment = collectionComment => dispatch => (
  APIUtil.updateCollection(collectionComment).then(response => processResponse(response))
    .then(collectionComment => {
      dispatch(receiveCollectionComment(collectionComment));
      dispatch(setRedirect(`/collections/${collectionComment.collection_id}`));
    }).catch(errors => (
      dispatch(receiveCollectionCommentErrors(errors))
    ))
);

export const deleteCollection = id => dispatch => (
  APIUtil.deleteCollectionComment(id).then(response => response.json())
    .then(response => (
      dispatch(setRedirect(`/collections/${collectionComment.collection_id}`))
    ))
);