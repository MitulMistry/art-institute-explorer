import React from 'react';
import { CollectionCard } from './CollectionCard';
import { LoadingSpinner } from '../elements/LoadingSpinner';

export class CollectionsIndex extends React.Component {
  componentDidMount() {
    // Dispatch Redux action to fetch Collections via API call
    const { fetchCollections } = this.props;
    fetchCollections();
  }

  render() {
    const { collectionsArray } = this.props;
    
    if (collectionsArray.length > 0) {
      return (
        <div className="collections-index">
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
      return (
        <div className="collections-index">
          <LoadingSpinner />
        </div>
      );
    }
  }
}