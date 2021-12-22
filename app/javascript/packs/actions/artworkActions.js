import * as APIUtil from '../util/artworkAPIUtil';

export const RECEIVE_ARTWORKS = 'RECEIVE_ARTWORKS';
export const RECEIVE_SAVED_ARTWORKS = 'RECEIVE_SAVED_ARTWORKS';
export const RECEIVE_ARTWORK = 'RECEIVE_ARTWORK';

export const receiveArtworks = response => ({
  type: RECEIVE_ARTWORKS,
  response,
});

export const receiveSavedArtworks = artworks => ({
  type: RECEIVE_SAVED_ARTWORKS,
  artworks,
});

export const receiveArtwork = response => ({
  type: RECEIVE_ARTWORK,
  response,
});

export const fetchArtworks = () => dispatch => (
  APIUtil.fetchArtworks().then(response => response.json())
    .then(response => (
      dispatch(receiveArtworks(response))
    ))
);

export const fetchSavedArtworks = () => dispatch => (
  APIUtil.fetchSavedArtworks().then(response => response.json())
    .then(artworks => (
      dispatch(receiveSavedArtworks(artworks))
    ))
);

export const fetchArtwork = id => dispatch => (
  APIUtil.fetchArtwork(id).then(response => response.json())
    .then(response => (
      dispatch(receiveArtwork(response))
    ))
);