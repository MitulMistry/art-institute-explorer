import { connect } from 'react-redux';
import { CollectionCommentCard } from './CollectionCommentCard';

const mapStateToProps = (state, ownProps) => ({
  comment: ownProps.comment,
  owned: Boolean(ownProps.comment.user_id === state.session.id)
});

export default connect(
  mapStateToProps
)(CollectionCommentCard);