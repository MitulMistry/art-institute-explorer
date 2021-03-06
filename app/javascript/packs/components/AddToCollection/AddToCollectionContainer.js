import { connect } from 'react-redux';
import AddToCollectionParent from './AddToCollectionParent';

// Actions
import { fetchArtwork } from '../../actions/artworkActions';
import { fetchOwnedCollections } from '../../actions/collectionActions';
import { updateCollection } from '../../actions/collectionActions';
import { resetRedirect } from '../../actions/uiActions';
import { resetCollectionErrors } from '../../actions/collectionActions';

const mapStateToProps = state => ({
  artworkShow: state.entities.artworks.artworkShow,
  imageBaseUrl: state.entities.artworks.artworkShowResponse.config.iiif_url,
  errors: state.errors.collectionErrors,
  collections: state.session.ownedCollections,
  redirect: state.ui.redirect
});

const mapDispatchToProps = dispatch => ({
  fetchArtwork: id => dispatch(fetchArtwork(id)),
  fetchOwnedCollections: () => dispatch(fetchOwnedCollections()),
  processForm: collection => dispatch(updateCollection(collection)),
  resetRedirect: () => dispatch(resetRedirect()),
  resetCollectionErrors: () => dispatch(resetCollectionErrors())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddToCollectionParent);