import { connect } from 'react-redux';
import { CollectionForm } from '../CollectionForm/CollectionForm';

// Actions
import { createCollection } from '../../actions/collectionActions';
import { resetRedirect } from '../../actions/uiActions';
import { resetCollectionErrors } from '../../actions/collectionActions';

const mapStateToProps = state => ({
  errors: state.errors.collectionErrors,
  formType: 'newCollection',
  collection: null,
  redirect: state.ui.redirect
});

const mapDispatchToProps = dispatch => ({
  processForm: collection => dispatch(createCollection(collection)),
  resetRedirect: () => dispatch(resetRedirect()),
  resetCollectionErrors: () => dispatch(resetCollectionErrors())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionForm);