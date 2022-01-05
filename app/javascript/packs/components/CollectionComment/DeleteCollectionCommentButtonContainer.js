import { connect } from 'react-redux';
import { DeleteButton } from '../elements/DeleteButton';

// Actions
import { deleteCollectionComment } from '../../actions/collectionCommentActions';

const mapStateToProps = (state, ownProps) => ({
  id: ownProps.id
});

const mapDispatchToProps = dispatch => ({
  processButton: id => dispatch(deleteCollectionComment(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteButton);