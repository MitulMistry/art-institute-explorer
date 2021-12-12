import React from 'react';
import {
  Routes,
  Route
} from 'react-router-dom';

import { NavBar } from './nav/NavBar';
import HomePageContainer from './HomePage/HomePageContainer';
import LoginFormContainer from './LoginForm/LoginFormContainer';
import SignUpFormContainer from './SignUpForm/SignUpFormContainer';
import UserShowContainer from './UserShow/UserShowContainer';
import UserEditContainer from './UserEdit/UserEditContainer';
import ArtworksIndexContainer from './ArtworksIndex/ArtworksIndexContainer';
import ArtworksShowContainer from './ArtworkShow/ArtworksShowContainer';
import ArtworksSavedContainer from './ArtworksSaved/ArtworksSavedContainer';
import CollectionsIndexContainer from './CollectionsIndex/CollectionsIndexContainer';
import CollectionsNewContainer from './CollectionNew/CollectionNewContainer';
import CollectionShowContainer from './CollectionShow/CollectionShowContainer';
import CollectionEditContainer from './CollectionEdit/CollectionEditContainer';
import { Footer } from './common/Footer';

const App = () => (
  <div className="app">
    <NavBar />
    <Routes>
      <Route path="/" element={<HomePageContainer />} />
      <Route path="login" element={<LoginFormContainer />} />        
      <Route path="signup" element={<SignUpFormContainer />} />        
      <Route path="users/:userId" element={<UserShowContainer />} />        
      <Route path="users/:userId/edit" element={<UserEditContainer />} />        
      <Route path="artworks" element={<ArtworksIndexContainer />} />        
      <Route path="artworks/:artworkId" element={<ArtworksShowContainer />} />        
      <Route path="artworks/saved" element={<ArtworksSavedContainer />} />        
      <Route path="collections" element={<CollectionsIndexContainer />} />        
      <Route path="collections/new" element={<CollectionsNewContainer />} />        
      <Route path="collections/:collectionId" element={<CollectionShowContainer />} />        
      <Route path="collections/:collectionId/edit" element={<CollectionEditContainer />} />        
    </Routes>
    <Footer />
  </div>
);

export default App;