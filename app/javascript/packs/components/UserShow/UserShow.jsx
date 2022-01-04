import React from 'react';
import { CollectionsGrid } from '../CollectionsIndex/CollectionsGrid';
import { ArtworksGrid } from '../ArtworksIndex/ArtworksGrid';
import { LoadingSpinner } from '../elements/LoadingSpinner';
import { Link } from 'react-router-dom';
import DeleteUserButtonContainer from './DeleteUserButtonContainer';

export class UserShow extends React.Component {
  componentDidMount() {
    // Dispatch Redux action to fetch User via API call
    const { fetchUser, userId } = this.props;
    fetchUser(userId);
  }

  render() {
    const { userShow, userId, owned } = this.props;

    if (userShow && userShow.id === userId) {

      let modifyButtons = null;
      if (owned) {
        modifyButtons = (
          <p>
            <Link to="edit">
              <button className="btn-primary-small">Edit</button>
            </Link>
            <DeleteUserButtonContainer id={userId} />
          </p>
        );
      }

      let userCollections = null;
      if (userShow.collections.length > 0) {
        userCollections = (
          <div className="user-collections">
            <h1 className="header-ruler">User Collections</h1>
            <CollectionsGrid
              collectionsArray={userShow.collections}
            />
          </div>
        );
      }

      let savedArtworks = null;
      if (userShow.saved_artworks.length > 0) {
        savedArtworks = (
          <div className="user-saved-artworks">
            <h1 className="header-ruler">Saved Artworks</h1>
            <ArtworksGrid
              artworksArray={userShow.saved_artworks}
              imageBaseUrl={userShow.saved_artworks[0].image_url_prefix}
            />
          </div>
        );
      }

      return (
        <div className="user-show">
          <div className="user-show-description">
            <h1>{userShow.username}</h1>
            <p>{userShow.bio}</p>
            {modifyButtons}
          </div>
          {userCollections}
          {savedArtworks}
        </div>
      );
    } else {
      return (
        <div className="user-show">
          <LoadingSpinner />
        </div>
      );
    }
  }
}