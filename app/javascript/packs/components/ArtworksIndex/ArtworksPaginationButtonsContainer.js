import { connect } from 'react-redux';
import { PaginationButtons } from '../elements/PaginationButtons';

// Actions
import { fetchArtworks } from '../../actions/artworkActions';

const mapStateToProps = state => ({
  currentPage: state.entities.artworks.artworksArrayCurrentPage,
  totalPages: state.entities.artworks.artworksArrayTotalPages
});

const mapDispatchToProps = dispatch => ({
  processClick: page => dispatch(fetchArtworks(page))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaginationButtons);