import * as APIUtil from '../util/artworkSaveAPIUtil';
import { processResponse } from '../util/APIRequestHelpers';

export const RECEIVE_ARTWORK_SAVE = 'RECEIVE_ARTWORK_SAVE';
export const REMOVE_ARTWORK_SAVE = 'REMOVE_ARTWORK_SAVE';

export const receiveArtworkSave = artworkSave => ({
  type: RECEIVE_ARTWORK_SAVE,
  artworkSave,
});

export const removeArtworkSave = aic_id => ({
  type: REMOVE_ARTWORK_SAVE,
  aic_id,
});

export const createArtworkSave = aic_id => dispatch => (
  APIUtil.createArtworkSave(aic_id).then(response => processResponse(response))
    .then(artworkSave => {
      dispatch(receiveArtworkSave(artworkSave));
    })
);

export const deleteArtworkSave = aic_id => dispatch => (
  APIUtil.deleteArtworkSave(aic_id)
    .then(response => (
      dispatch(removeArtworkSave(aic_id))
    ))
);