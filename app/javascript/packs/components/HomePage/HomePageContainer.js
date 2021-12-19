import { connect } from 'react-redux';
import { HomePage } from './HomePage';

// Actions
import { fetchMixedDataIndex } from '../../actions/mixedDataActions';

const mapStateToProps = state => ({
  collectionsArray: state.entities.splashPage.collectionsArray,
  artworksArray: state.entities.splashPage.artworksArray,
  imageBaseUrl: state.entities.splashPage.artworksArrayResponse.config.iiif_url
});

const mapDispatchToProps = dispatch => ({
  fetchMixedDataIndex: () => dispatch(fetchMixedDataIndex())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);