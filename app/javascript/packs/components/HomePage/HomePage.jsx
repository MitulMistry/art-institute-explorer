import React from 'react';
import { CollectionCard } from '../CollectionsIndex/CollectionCard';
import { ArtworkCard } from '../ArtworksIndex/ArtworkCard'; 
import { LoadingSpinner } from '../elements/LoadingSpinner';

export class HomePage extends React.Component {
  componentDidMount() {
    // Dispatch Redux action to fetch mixed data index via API call
    const { fetchMixedDataIndex } = this.props;
    fetchMixedDataIndex();
  }

  render() {
    const { artworksArray, collectionsArray, imageBaseUrl } = this.props;

    let artworks = null;
    if (artworksArray.length > 0 && imageBaseUrl) {
      artworks = (
        <div className="artworks">
          <h1 className="header-ruler">Artworks</h1>
          <div className="cards-container masonry-with-columns">
            {artworksArray.map((artwork, i) =>
              <ArtworkCard
                key={i}
                artwork={artwork}
                imageBaseUrl={imageBaseUrl}
              />
            )}
          </div>
        </div>
      );
    } else {
      artworks = (
        <div className="artworks">
          <LoadingSpinner />
        </div>
      );
    }

    let collections = null;
    if (collectionsArray.length > 0) {
      collections = (
        <div className="collections">
          <h1 className="header-ruler">Collections</h1>
          <div className="cards-container masonry-with-columns">
            {collectionsArray.map((collection, i) =>
              <CollectionCard
                key={i}
                collection={collection}
              />
            )}
          </div>
        </div>
      );
    } else {
      collections = (
        <div className="collections">
          <LoadingSpinner />
        </div>
      );
    }
    
    return (
      <div className="splash-page">
        <h1 className="header-ruler">AIC Explorer</h1>
        <p>
          Explore thousands of artworks from the Art Institute of Chicago (AIC).
          Save your favorite artworks to your profile and create custom collections to share.
        </p>
        {artworks}
        {collections}
      </div>
    );
  }
}