import { combineReducers } from 'redux';

import artworksReducer from './artworksReducer';
import collectionsReducer from './collectionsReducer';
import collectionCommentsReducer from './collectionCommentsReducer';
import usersReducer from './usersReducer';
import homePageReducer from './homePageReducer';

const entitiesReducer = combineReducers({
  artworks: artworksReducer,
  collections: collectionsReducer,
  collectionComments: collectionCommentsReducer,
  users: usersReducer,
  homePage: homePageReducer
});

export default entitiesReducer;