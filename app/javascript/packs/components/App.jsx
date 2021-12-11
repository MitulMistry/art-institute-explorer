import React from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';

import NavBar from './nav/NavBar';

const App = () => (
  <div className="app">
    <NavBar/>
    <Switch>
      <Route path="/">
        <HomePageContainer />
      </Route>
      <Route path="/login">
        <LoginFormContainer />
      </Route>
      <Route path="/signup">
        <SignUpFormContainer />
      </Route>
      <Route path="/users/:userId">
        <UserShowContainer />
      </Route>
      <Route path="/artworks">
        <ArtworksIndexContainer />
      </Route>
      <Route path="/artworks/:artworkId">
        <ArtworksShowContainer />
      </Route>
      <Route path="/artworks/saved">
        <ArtworksSavedContainer />
      </Route>
      <Route path="/collections">
        <CollectionsIndexContainer />        
      </Route>
      <Route path="/collections/new">
        <CollectionsNewContainer />
      </Route>
      <Route path="/collections/:collectionId">
        <CollectionsShowContainer />        
      </Route>
      <Route path="/collections/:collectionId/edit">
        <CollectionsEditContainer />        
      </Route>
    </Switch>
    <Footer />
  </div>
);

export default App;