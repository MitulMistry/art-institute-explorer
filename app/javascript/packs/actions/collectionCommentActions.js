import * as APIUtil from '../util/collectionCommentAPIUtil';
import { setRedirect } from './uiActions';
import { processResponse } from '../util/APIRequestHelpers';

export const RECEIVE_COLLECTION_COMMENT = 'RECEIVE_COLLECTION_COMMENT';
export const RECEIVE_UPDATED_COLLECTION_COMMENT = 'RECEIVE_UPDATED_COLLECTION_COMMENT';
export const REMOVE_COLLECTION_COMMENT = 'REMOVE_COLLECTION_COMMENT';
export const RECEIVE_COLLECTION_COMMENT_ERRORS = 'RECEIVE_COLLECTION_COMMENT_ERRORS';
export const RESET_COLLECTION_COMMENT_ERRORS = 'RESET_COLLECTION_COMMENT_ERRORS';

export const receiveCollectionComment = collectionComment => ({
  type: RECEIVE_COLLECTION_COMMENT,
  collectionComment,
});

export const receiveUpdatedCollectionComment = collectionComment => ({
  type: RECEIVE_UPDATED_COLLECTION_COMMENT,
  collectionComment,
});

export const removeCollectionComment = collectionCommentId => ({
  type: REMOVE_COLLECTION_COMMENT,
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
  APIUtil.updateCollectionComment(collectionComment).then(response => processResponse(response))
    .then(collectionComment => {
      dispatch(receiveUpdatedCollectionComment(collectionComment));
      dispatch(setRedirect(`/collections/${collectionComment.collection_id}`));
    }).catch(errors => (
      dispatch(receiveCollectionCommentErrors(errors))
    ))
);

export const deleteCollectionComment = id => dispatch => (
  APIUtil.deleteCollectionComment(id)
    .then(response => (
      dispatch(removeCollectionComment(id))
    ))
);