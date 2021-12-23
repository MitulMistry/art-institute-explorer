import { connect } from 'react-redux';
import { CollectionForm } from '../CollectionForm/CollectionForm';

// Actions
import { updateCollection } from '../../actions/collectionActions';
import { resetCollectionErrors } from '../../actions/collectionActions';

const mapStateToProps = state => ({
  errors: state.errors.collectionErrors,
  formType: 'editCollection',
  collection: null
});

const mapDispatchToProps = dispatch => ({
  processForm: collection => dispatch(createCollection(collection)),
  resetCollectionErrors: () => dispatch(resetCollectionErrors())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionForm);