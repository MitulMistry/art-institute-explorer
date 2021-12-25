import { connect } from 'react-redux';
import { CollectionCommentForm } from '../CollectionCommentForm/CollectionCommentForm';

// Actions
import { createCollectionComment } from '../../actions/collectionCommentActions';
import { resetRedirect } from '../../actions/uiActions';
import { resetCollectionCommentErrors } from '../../actions/collectionCommentActions';

const mapStateToProps = state => ({
  errors: state.errors.collectionCommentErrors,
  formType: 'newCollectionComment',
  collectionId: state.entities.collections.collectionShow.id,
  collectionComment: null,
  redirect: state.ui.redirect
});

const mapDispatchToProps = dispatch => ({
  processForm: collectionComment => dispatch(createCollectionComment(collectionComment)),
  resetRedirect: () => dispatch(resetRedirect()),
  resetCollectionCommentErrors: () => dispatch(resetCollectionCommentErrors())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionCommentForm);