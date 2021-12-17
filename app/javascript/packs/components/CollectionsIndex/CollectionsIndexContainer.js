import { connect } from 'react-redux';
import { CollectionsIndex } from './CollectionsIndex';

// Actions
import { fetchCollections } from '../../actions/collectionActions';

const mapStateToProps = state => ({
  collectionsArray: state.entities.collections.collectionsArray
});

const mapDispatchToProps = dispatch => ({
  fetchCollections: () => dispatch(fetchCollections())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionsIndex);