import * as APIUtil from '../util/mixedDataAPIUtil';

export const RECEIVE_MIXED_DATA_INDEX = 'RECEIVE_MIXED_DATA_INDEX';
export const RESET_MIXED_DATA_INDEX = 'RESET_MIXED_DATA_INDEX';

export const receiveMixedDataIndex = response => ({
  type: RECEIVE_MIXED_DATA_INDEX,
  response,
});

export const resetMixedDataIndex = response => ({
  type: RESET_MIXED_DATA_INDEX,
});

export const fetchMixedDataIndex = () => dispatch => {
  dispatch(resetMixedDataIndex());
  APIUtil.fetchMixedDataIndex().then(response => response.json())
    .then(response => (
      dispatch(receiveMixedDataIndex(response))
    ));
};