import { connect } from 'react-redux';
import { CollectionCommentForm } from '../CollectionCommentForm/CollectionCommentForm';

// Actions
import { updateCollectionComment } from '../../actions/collectionCommentActions';
import { resetRedirect } from '../../actions/uiActions';
import { resetCollectionCommentErrors } from '../../actions/collectionCommentActions';

const mapStateToProps = state => ({
  errors: state.errors.collectionCommentErrors,
  formType: 'editCollectionComment',
  collectionId: state.entities.collections.collectionShow.id,
  collectionComment: null,
  redirect: state.ui.redirect
});

const mapDispatchToProps = dispatch => ({
  processForm: collectionComment => dispatch(updateCollectionComment(collectionComment)),
  resetRedirect: () => dispatch(resetRedirect()),
  resetCollectionCommentErrors: () => dispatch(resetCollectionCommentErrors())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionCommentForm);