import * as APIUtil from '../util/artworkAPIUtil';
import { setSearchQuery } from './uiActions';

export const RECEIVE_ARTWORKS = 'RECEIVE_ARTWORKS';
export const RECEIVE_SAVED_ARTWORKS = 'RECEIVE_SAVED_ARTWORKS';
export const RECEIVE_ARTWORK = 'RECEIVE_ARTWORK';
export const RESET_ARTWORKS = 'RESET_ARTWORKS';
export const RESET_SAVED_ARTWORKS = 'RESET_SAVED_ARTWORKS';
export const RESET_ARTWORK = 'RESET_ARTWORK';

export const receiveArtworks = response => ({
  type: RECEIVE_ARTWORKS,
  response,
});

export const receiveSavedArtworks = response => ({
  type: RECEIVE_SAVED_ARTWORKS,
  response,
});

export const receiveArtwork = response => ({
  type: RECEIVE_ARTWORK,
  response,
});

export const resetArtworks = () => ({
  type: RESET_ARTWORKS,
});

export const resetSavedArtworks = () => ({
  type: RESET_SAVED_ARTWORKS,
});

export const resetArtwork = () => ({
  type: RESET_ARTWORK,
});

export const fetchArtworks = page => dispatch => {
  dispatch(resetArtworks());
  APIUtil.fetchArtworks(page).then(response => response.json())
    .then(response => (
      dispatch(receiveArtworks(response))
    ));
};

export const fetchSavedArtworks = page => dispatch => {
  dispatch(resetSavedArtworks());
  APIUtil.fetchSavedArtworks(page).then(response => response.json())
    .then(response => (
      dispatch(receiveSavedArtworks(response))
    ));
};

export const fetchArtwork = id => dispatch => {
  dispatch(resetArtwork());
  APIUtil.fetchArtwork(id).then(response => response.json())
    .then(response => (
      dispatch(receiveArtwork(response))
    ));
};

export const searchArtworks = (queryString, page) => dispatch => {
  dispatch(resetArtworks());
  dispatch(setSearchQuery(queryString));
  APIUtil.searchArtworks(queryString, page).then(response => response.json())
    .then(response => (
      dispatch(receiveArtworks(response))
    ));
};