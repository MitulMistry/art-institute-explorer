import { connect } from 'react-redux';
// import { ArtworkShow } from './ArtworkShow';
import ArtworkShowParent from './ArtworkShowParent';

// Actions
import { fetchArtwork } from '../../actions/artworkActions';

const mapStateToProps = state => ({
  artworkShow: state.entities.artworks.artworkShow,
  imageBaseUrl: state.entities.artworks.artworkShowResponse.config.iiif_url
});

const mapDispatchToProps = dispatch => ({
  fetchArtwork: id => dispatch(fetchArtwork(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArtworkShowParent);