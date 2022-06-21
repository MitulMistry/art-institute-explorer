import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from '../reducers/rootReducer';

const configureStore = (preloadedState = {}) => {
  const store = createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(
      applyMiddleware(thunk, logger)
    )
  );

  // When changes occur to the store, load data from the store into the
  // browser's local storage to be loaded upon user's return to the site.
  store.subscribe(() => {
    let state = store.getState();
    localStorage.state = JSON.stringify(state);
  });

  return store;
}

export default configureStore;