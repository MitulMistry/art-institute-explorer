import React from 'react';
import {
  Routes,
  Route
} from 'react-router-dom';

import NavBarContainer from './NavBar/NavBarContainer';
import HomePageContainer from './HomePage/HomePageContainer';
import LoginFormContainer from './LoginForm/LoginFormContainer';
import SignUpFormContainer from './SignUpForm/SignUpFormContainer';
import UserShowContainer from './UserShow/UserShowContainer';
import UserEditContainer from './UserEdit/UserEditContainer';
import ArtworksIndexContainer from './ArtworksIndex/ArtworksIndexContainer';
import ArtworkShowContainer from './ArtworkShow/ArtworkShowContainer';
import AddToCollectionContainer from './AddToCollection/AddToCollectionContainer';
import ArtworksSavedContainer from './ArtworksSaved/ArtworksSavedContainer';
import ArtworksSearchedContainer from './ArtworksSearched/ArtworksSearchedContainer';
import CollectionsIndexContainer from './CollectionsIndex/CollectionsIndexContainer';
import CollectionsNewContainer from './CollectionNew/CollectionNewContainer';
import CollectionShowContainer from './CollectionShow/CollectionShowContainer';
import CollectionEditContainer from './CollectionEdit/CollectionEditContainer';
import { ProtectedRoute, AuthRoute } from './routeUtil/routeUtil';

const App = () => (
  <div className="app">
    <NavBarContainer />
    <div className="content">
      <Routes>
        <Route path="/" element={<HomePageContainer />} />
        <Route path="login" element={
          <AuthRoute>
            <LoginFormContainer />
          </AuthRoute>
        } />
        <Route path="signup" element={
          <AuthRoute>
            <SignUpFormContainer />
          </AuthRoute>
        } />
        <Route path="users/:userId" element={<UserShowContainer />} />
        <Route path="users/:userId/edit" element={
        <ProtectedRoute>
          <UserEditContainer />
        </ProtectedRoute>
        } />
        <Route path="artworks" element={<ArtworksIndexContainer />} />
        <Route path="artworks/:artworkId" element={<ArtworkShowContainer />} />
        <Route path="artworks/:artworkId/add" element={
          <ProtectedRoute>
            <AddToCollectionContainer />
          </ProtectedRoute>
        } />
        <Route path="artworks/saved" element={
          <ProtectedRoute>
            <ArtworksSavedContainer />
          </ProtectedRoute>
        } />
        <Route path="artworks/search" element={<ArtworksSearchedContainer />} />
        <Route path="collections" element={<CollectionsIndexContainer />} />
        <Route path="collections/new" element={
          <ProtectedRoute>
            <CollectionsNewContainer />
          </ProtectedRoute>
        } />
        <Route path="collections/:collectionId" element={<CollectionShowContainer />} />
        <Route path="collections/:collectionId/edit" element={
          <ProtectedRoute>
            <CollectionEditContainer />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  </div>
);

export default App;