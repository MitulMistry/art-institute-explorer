import { connect } from 'react-redux';
import { PaginationButtons } from '../elements/PaginationButtons';

// Actions
import { searchArtworks } from '../../actions/artworkActions';

const mapStateToProps = state => ({
  currentPage: state.entities.artworks.artworksArrayCurrentPage,
  totalPages: state.entities.artworks.artworksArrayTotalPages
});

// Create an action creator function using Redux-Thunk to gain access to
// the state and load the query string for the search.
const processClick = page => (dispatch, getState) => {
  let state = getState();
  let queryString = state.ui.searchQuery;
  dispatch(searchArtworks(queryString, page));
};

const mapDispatchToProps = dispatch => ({
  processClick: page => dispatch(processClick(page))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaginationButtons);