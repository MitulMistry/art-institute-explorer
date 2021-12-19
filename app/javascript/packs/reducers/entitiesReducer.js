import { combineReducers } from 'redux';

import artworksReducer from './artworksReducer';
import collectionsReducer from './collectionsReducer';
import usersReducer from './usersReducer';
import homePageReducer from './homePageReducer';

const entitiesReducer = combineReducers({
  artworks: artworksReducer,
  collections: collectionsReducer,
  users: usersReducer,
  homePage: homePageReducer
});

export default entitiesReducer;