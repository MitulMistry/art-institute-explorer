import { connect } from 'react-redux';
import CollectionShowParent from './CollectionShowParent';

// Actions
import { fetchCollection } from '../../actions/collectionActions';

const mapStateToProps = state => ({
  collectionShow: state.entities.collections.collectionShow,
  loggedIn: Boolean(state.session.id)
});

const mapDispatchToProps = dispatch => ({
  fetchCollection: id => dispatch(fetchCollection(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionShowParent);