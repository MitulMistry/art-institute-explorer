import { combineReducers } from 'redux';

import sessionErrorsReducer from './sessionErrorsReducer';
import collectionErrorsReducer from './collectionErrorsReducer';

const errorsReducer = combineReducers({
  sessionErrors: sessionErrorsReducer,
  collectionErrors: collectionErrorsReducer
});

export default errorsReducer;