import { combineReducers } from 'redux';

import artworksReducer from './artworksReducer';
import collectionsReducer from './collectionsReducer';
import usersReducer from './usersReducer';

const entitiesReducer = combineReducers({
  artworks: artworksReducer,
  collections: collectionsReducer,
  users: usersReducer
});

export default entitiesReducer;