import React from 'react';
import { Link } from 'react-router-dom';
import DeleteCollectionCommentButtonContainer from './DeleteCollectionCommentButtonContainer';
import CollectionCommentEditContainer from '../CollectionCommentEdit/CollectionCommentEditContainer';

import { formatDateTime } from '../../util/stringHelpers';

export class CollectionCommentCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editEnabled: false
    }
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  toggleEdit() {
    this.setState(prevState => ({
      editEnabled: !prevState.editEnabled
    }));
  }

  render() {
    const { comment, owned } = this.props;

    let modifyButtons = null;
    if (owned) {
      modifyButtons = (
        <p className="modify-buttons">
          <button className="btn-primary-small" onClick={this.toggleEdit}>Edit</button>
          <DeleteCollectionCommentButtonContainer id={comment.id} />
        </p>
      );
    }

    if (!this.state.editEnabled) {
      return (
        <div className="comment-card">
          <p className="title">
            <Link to={`/users/${comment.user_id}`}>{comment.username}</Link><span className="date-time"> - {formatDateTime(comment.created_at)}</span>
          </p>
          <p className="body">{comment.body}</p>
          {modifyButtons}
        </div>
      );
    } else {
      return (
        <div className="comment-card">
          <CollectionCommentEditContainer
          comment={comment}
          />
        </div>
      );
    }

    
  }
}