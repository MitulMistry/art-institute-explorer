import { connect } from 'react-redux';
import { ArtworksIndex } from './ArtworksIndex';

// Actions
import { fetchArtworks } from '../../actions/artworkActions';

const mapStateToProps = state => ({
  artworksArray: state.entities.artworks.artworksArray,
  imageBaseUrl: state.entities.artworks.artworksArrayResponse.config.iiif_url
});

const mapDispatchToProps = dispatch => ({
  fetchArtworks: () => dispatch(fetchArtworks())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArtworksIndex);