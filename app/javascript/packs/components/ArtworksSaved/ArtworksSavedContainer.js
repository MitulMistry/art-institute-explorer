import { connect } from 'react-redux';
import { ArtworksSaved } from './ArtworksSaved';

// Actions
import { fetchSavedArtworks } from '../../actions/artworkActions';

const mapStateToProps = state => ({
  savedArtworksArray: state.entities.artworks.savedArtworksArray
});

const mapDispatchToProps = dispatch => ({
  fetchSavedArtworks: () => dispatch(fetchSavedArtworks())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArtworksSaved);