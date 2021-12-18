import { connect } from 'react-redux';
import CollectionShowParent from './CollectionShowParent';

// Actions
import { fetchCollection } from '../../actions/collectionActions';

const mapStateToProps = state => ({
  collectionShow: state.entities.collections.collectionShow
});

const mapDispatchToProps = dispatch => ({
  fetchCollection: id => dispatch(fetchCollection(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionShowParent);