// Run this file by adding <%= javascript_pack_tag 'hello_react' %> to the head of 
// the layout file, like app/views/layouts/application.html.erb.

// React
import React from 'react';
import ReactDOM from 'react-dom';

// Components
import Root from './components/Root';
import { Footer } from './components/common/Footer';
import configureStore from './store/store';

document.addEventListener('DOMContentLoaded', () => {
  // Load previous state from browser's localStorage into Redux store
  // if it exists, otherwise use empty object.
  const preloadedState = localStorage.state ?
    JSON.parse(localStorage.state) : {};
  const store = configureStore(preloadedState);

  // Set up sticky footer with Flexbox by rendering an array.
  const content = [<Root store={store} key="1" />, <Footer key="2" />];

  ReactDOM.render(
    <React.StrictMode>
      {content}
    </React.StrictMode>,
    document.getElementById('root')
  );
});
