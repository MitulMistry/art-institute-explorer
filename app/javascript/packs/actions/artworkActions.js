import * as APIUtil from '../util/artworkAPIUtil';

export const RECEIVE_ARTWORKS = 'RECEIVE_ARTWORKS';
export const RECEIVE_ARTWORK = 'RECEIVE_ARTWORK';

export const receiveArtworks = response => ({
  type: RECEIVE_ARTWORKS,
  response,
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

export const fetchArtwork = id => dispatch => (
  APIUtil.fetchArtwork(id).then(response => response.json())
    .then(artwork => (
      dispatch(receiveArtwork(artwork))
    ))
);