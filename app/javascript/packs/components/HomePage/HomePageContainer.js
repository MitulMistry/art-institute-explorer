import { connect } from 'react-redux';
import { HomePage } from './HomePage';

// Actions
import { fetchMixedDataIndex } from '../../actions/mixedDataActions';

const mapStateToProps = state => ({
  collectionsArray: state.entities.homePage.collectionsArray,
  artworksArray: state.entities.homePage.artworksArray,
  imageBaseUrl: state.entities.homePage.artworksArrayResponse.config.iiif_url,
  loggedIn: Boolean(state.session.id)
});

const mapDispatchToProps = dispatch => ({
  fetchMixedDataIndex: () => dispatch(fetchMixedDataIndex())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);