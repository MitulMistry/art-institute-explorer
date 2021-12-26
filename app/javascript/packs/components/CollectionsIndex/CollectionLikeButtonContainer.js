import { connect } from 'react-redux';
import { CollectionLikeButton } from './CollectionLikeButton';

// Actions
import { createCollectionLike } from '../../actions/collectionLikeActions';
import { deleteCollectionLike } from '../../util/collectionLikeAPIUtil';

const mapStateToProps = (state, ownProps) => ({
  loggedIn: Boolean(state.session.id),
  likedCollectionIds: state.session.likedCollectionIds,
  collection: ownProps.collection
});

const mapDispatchToProps = dispatch => ({
  createCollectionLike: collection_id => dispatch(createCollectionLike(collection_id)),
  deleteCollectionLike: collection_id => dispatch(deleteCollectionLike(collection_id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionLikeButton);