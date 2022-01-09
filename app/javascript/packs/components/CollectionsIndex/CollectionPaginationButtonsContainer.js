import { connect } from 'react-redux';
import { PaginationButtons } from '../elements/PaginationButtons';

// Actions
import { fetchCollections } from '../../actions/collectionActions';

const mapStateToProps = state => ({
  currentPage: state.entities.collections.collectionsCurrentPage,
  totalPages: state.entities.collections.collectionsTotalPages
});

const mapDispatchToProps = dispatch => ({
  processClick: page => dispatch(fetchCollections(page))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaginationButtons);