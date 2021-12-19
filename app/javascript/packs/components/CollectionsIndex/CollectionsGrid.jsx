import React from 'react';
import { CollectionCard } from './CollectionCard';
import { LoadingSpinner } from '../elements/LoadingSpinner';

export class CollectionsGrid extends React.Component {
  render() {
    const { collectionsArray } = this.props;
    
    if (collectionsArray.length > 0) {
      return (
        <div className="collections-grid">          
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
        <div className="collections-grid">
          <LoadingSpinner />
        </div>
      );
    }
  }
}