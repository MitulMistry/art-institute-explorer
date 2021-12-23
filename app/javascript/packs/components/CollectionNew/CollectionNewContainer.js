import { connect } from 'react-redux';
import { CollectionForm } from '../CollectionForm/CollectionForm';

// Actions
import { createCollection } from '../../actions/collectionActions';
import { resetCollectionErrors } from '../../actions/collectionActions';

const mapStateToProps = state => ({
  errors: state.errors.collectionErrors,
  formType: 'newCollection',
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