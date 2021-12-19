import { combineReducers } from 'redux';

import artworksReducer from './artworksReducer';
import collectionsReducer from './collectionsReducer';
import usersReducer from './usersReducer';
import splashPageReducer from './splashPageReducer';

const entitiesReducer = combineReducers({
  artworks: artworksReducer,
  collections: collectionsReducer,
  users: usersReducer,
  splashPage: splashPageReducer
});

export default entitiesReducer;