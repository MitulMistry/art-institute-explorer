import React from 'react';
import { CollectionCommentCard } from './CollectionCommentCard';

export class CollectionCommentsGrid extends React.Component {
  render() {
    const { commentsArray } = this.props;

    if (commentsArray.length > 0) {
      return (
        <div className="comments-grid">          
          <div className="comments-container">
            {commentsArray.map((comment, i) =>
              <CollectionCommentCard
                key={i}
                comment={comment}
              />
            )}
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}