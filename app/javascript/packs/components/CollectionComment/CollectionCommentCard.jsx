import React from 'react';
import { Link } from 'react-router-dom';

import { formatDateTime } from '../../util/stringHelpers';

export const CollectionCommentCard = ({comment}) => (
  <div className="comment-card">
    <p className="title">
      <Link to={`/users/${comment.user_id}`}>{comment.username}</Link><span className="date-time"> - {formatDateTime(comment.created_at)}</span>
    </p>
    <p className="body">{comment.body}</p>
  </div>
);