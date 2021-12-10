// Run this file by adding <%= javascript_pack_tag 'hello_react' %> to the head of 
// the layout file, like app/views/layouts/application.html.erb.

// React
import React from 'react';
import ReactDOM from 'react-dom';

// Components
import App from './components/App';
import configureStore from './store/store';

document.addEventListener('DOMContentLoaded', () => {
  // Load previous state from browser's localStorage into Redux store
  // if it exists, otherwise use empty object.
  const preloadedState = localStorage.state ?
    JSON.parse(localStorage.state) : {};
  const store = configureStore(preloadedState);

  ReactDOM.render(
    <React.StrictMode>
      <App store={store} />
    </React.StrictMode>,
    document.getElementById('root')
  );
});
