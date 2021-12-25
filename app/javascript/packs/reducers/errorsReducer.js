import { combineReducers } from 'redux';

import sessionErrorsReducer from './sessionErrorsReducer';
import collectionErrorsReducer from './collectionErrorsReducer';
import collectionCommentErrorsReducer from './collectionCommentErrorsReducer';

const errorsReducer = combineReducers({
  sessionErrors: sessionErrorsReducer,
  collectionErrors: collectionErrorsReducer,
  collectionCommentErrors: collectionCommentErrorsReducer
});

export default errorsReducer;