import React from 'react';
import { CollectionsGrid } from './CollectionsGrid';

export class CollectionsIndex extends React.Component {
  componentDidMount() {
    // Dispatch Redux action to fetch Collections via API call
    const { fetchCollections } = this.props;
    fetchCollections();
  }

  render() {
    const { collectionsArray } = this.props;
    
    return (
      <div className="collections-index">
        <h1 className="header-ruler">Collections</h1>
        <CollectionsGrid
          collectionsArray={collectionsArray}
        />
      </div>
    );
  }
}