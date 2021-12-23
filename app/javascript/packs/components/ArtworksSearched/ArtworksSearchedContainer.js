import { connect } from 'react-redux';
import { ArtworksSearched } from './ArtworksSearched';

// Actions
import { searchArtworks } from '../../actions/artworkActions';

const mapStateToProps = state => ({
  artworksArray: state.entities.artworks.artworksArray,
  imageBaseUrl: state.entities.artworks.artworksArrayResponse.config.iiif_url
});

const mapDispatchToProps = dispatch => ({
  searchArtworks: queryString => dispatch(searchArtworks(queryString))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArtworksSearched);