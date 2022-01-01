import { connect } from 'react-redux';
import { CollectionForm } from '../CollectionForm/CollectionForm';

// Actions
import { createCollection } from '../../actions/collectionActions';
import { resetRedirect } from '../../actions/uiActions';
import { resetCollectionErrors } from '../../actions/collectionActions';
import { fetchSavedArtworks } from '../../actions/artworkActions';

const mapStateToProps = state => ({
  errors: state.errors.collectionErrors,
  formType: 'newCollection',
  collection: null,
  savedArtworksArray: state.entities.artworks.savedArtworksArray,
  redirect: state.ui.redirect
});

const mapDispatchToProps = dispatch => ({
  processForm: collection => dispatch(createCollection(collection)),
  resetRedirect: () => dispatch(resetRedirect()),
  resetCollectionErrors: () => dispatch(resetCollectionErrors()),
  fetchSavedArtworks: () => dispatch(fetchSavedArtworks())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionForm);