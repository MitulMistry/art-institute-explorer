import React from 'react';
import { CollectionCard } from '../CollectionsIndex/CollectionCard';
import { ArtworkCard } from '../ArtworksIndex/ArtworkCard';
import { LoadingSpinner } from '../elements/LoadingSpinner';

export class UserShow extends React.Component {
  componentDidMount() {
    // Dispatch Redux action to fetch User via API call
    const { fetchUser, userId } = this.props;
    fetchUser(userId);
  }

  render() {
    const { userShow, userId } = this.props;

    if (userShow && userShow.id == userId) {

      let userCollections = null;
      if (userShow.collections.length > 0) {
        userCollections = (
          <div className="user-collections">
            <h1 className="header-ruler">User Collections</h1>
            <div className="cards-container masonry-with-columns">
              {userShow.collections.map((collection, i) =>
                <CollectionCard
                  key={i}
                  collection={collection}
                />
              )}
            </div>
          </div>
        );
      }

      let savedArtworks = null;
      if (userShow.saved_artworks.length > 0) {
        savedArtworks = (
          <div className="user-saved-artworks">
            <h1 className="header-ruler">Saved Artworks</h1>
            <div className="cards-container masonry-with-columns">
              {userShow.saved_artworks.map((artwork, i) =>
                <ArtworkCard
                  key={i}
                  artwork={artwork}
                  imageBaseUrl={artwork.image_url_prefix}
                />
              )}
            </div>
          </div>
        );
      }

      return (
        <div className="user-show">
          <h1>{userShow.username}</h1>
          <p>{userShow.bio}</p>
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