import { connect } from 'react-redux';
import { CollectionLikeButton } from './CollectionLikeButton';

// Actions
import { createCollectionLike } from '../../actions/collectionLikeActions';
import { deleteCollectionLike } from '../../actions/collectionLikeActions';

// Since collection is being passed in as a prop to this container, it will
// not be updated if there are changes to it in the store.
const mapStateToProps = (state, ownProps) => ({
  loggedIn: Boolean(state.session.id),
  likedCollectionIds: state.session.likedCollectionsIds,
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