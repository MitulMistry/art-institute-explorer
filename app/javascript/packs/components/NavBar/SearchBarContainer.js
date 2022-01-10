import { connect } from 'react-redux';
import { SearchBar } from './SearchBar';

// Actions
import { searchArtworks } from '../../actions/artworkActions';

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  processForm: queryString => dispatch(searchArtworks(queryString, 1))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);