import React from 'react';
import { Link } from 'react-router-dom';

export class CollectionCard extends React.Component {
  render() {
    const { collection } = this.props;

    return (
      <div className="collection-card masonry-item">
        <h5 className="collection-card-title">
          <Link to={`${collection.id}`}>{collection.title}</Link>
        </h5>
        <p className="collection-card-user">{collection.user.username}</p>
      </div>
    );
  }
}