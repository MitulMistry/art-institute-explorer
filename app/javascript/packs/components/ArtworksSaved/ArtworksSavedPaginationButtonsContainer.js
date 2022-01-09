import { connect } from 'react-redux';
import { PaginationButtons } from '../elements/PaginationButtons';

// Actions
import { fetchSavedArtworks } from '../../actions/artworkActions';

const mapStateToProps = state => ({
  currentPage: state.entities.artworks.savedArtworksCurrentPage,
  totalPages: state.entities.artworks.savedArtworksTotalPages
});

const mapDispatchToProps = dispatch => ({
  processClick: page => dispatch(fetchSavedArtworks(page))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaginationButtons);