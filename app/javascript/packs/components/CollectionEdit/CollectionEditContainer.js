import { connect } from 'react-redux';
import CollectionEditParent from './CollectionEditParent';

// Actions
import { updateCollection } from '../../actions/collectionActions';
import { resetRedirect } from '../../actions/uiActions';
import { resetCollectionErrors } from '../../actions/collectionActions';
import { fetchCollection } from '../../actions/collectionActions';

const mapStateToProps = state => ({
  errors: state.errors.collectionErrors,
  formType: 'editCollection',
  collection: state.entities.collections.collectionShow,
  redirect: state.ui.redirect
});

const mapDispatchToProps = dispatch => ({
  processForm: collection => dispatch(updateCollection(collection)),
  resetRedirect: () => dispatch(resetRedirect()),
  resetCollectionErrors: () => dispatch(resetCollectionErrors()),
  fetchCollection: id => dispatch(fetchCollection(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionEditParent);