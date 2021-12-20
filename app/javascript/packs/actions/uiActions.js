export const SET_REDIRECT = 'REDIRECT';
export const RESET_REDIRECT = 'RESET_REDIRECT';

export const setRedirect = path => ({
  type: SET_REDIRECT,
  path,
});

export const resetRedirect = () => ({
  type: RESET_REDIRECT,
});