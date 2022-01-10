export const SET_REDIRECT = 'REDIRECT';
export const RESET_REDIRECT = 'RESET_REDIRECT';
export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';

export const setRedirect = path => ({
  type: SET_REDIRECT,
  path,
});

export const resetRedirect = () => ({
  type: RESET_REDIRECT,
});

export const setSearchQuery = searchQuery => ({
  type: SET_SEARCH_QUERY,
  searchQuery
});