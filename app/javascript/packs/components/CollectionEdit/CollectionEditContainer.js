import { connect } from 'react-redux';
import CollectionEditParent from './CollectionEditParent';

// Actions
import { updateCollection } from '../../actions/collectionActions';
import { resetRedirect } from '../../actions/uiActions';
import { resetCollectionErrors } from '../../actions/collectionActions';
import { fetchSavedArtworks } from '../../actions/artworkActions';
import { fetchCollection } from '../../actions/collectionActions';

const mapStateToProps = state => ({
  errors: state.errors.collectionErrors,
  formType: 'editCollection',
  collection: state.entities.collections.collectionShow,
  savedArtworksArray: state.entities.artworks.savedArtworksArray,
  redirect: state.ui.redirect
});

const mapDispatchToProps = dispatch => ({
  processForm: collection => dispatch(updateCollection(collection)),
  resetRedirect: () => dispatch(resetRedirect()),
  resetCollectionErrors: () => dispatch(resetCollectionErrors()),
  fetchCollection: id => dispatch(fetchCollection(id)),
  fetchSavedArtworks: () => dispatch(fetchSavedArtworks())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionEditParent);