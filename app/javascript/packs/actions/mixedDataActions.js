import * as APIUtil from '../util/mixedDataAPIUtil';

export const RECEIVE_MIXED_DATA_INDEX = 'RECEIVE_MIXED_DATA_INDEX';

export const receiveMixedDataIndex = response => ({
  type: RECEIVE_MIXED_DATA_INDEX,
  response,
});

export const fetchMixedDataIndex = () => dispatch => (
  APIUtil.fetchMixedDataIndex().then(response => response.json())
    .then(response => (
      dispatch(receiveMixedDataIndex(response))
    ))
);