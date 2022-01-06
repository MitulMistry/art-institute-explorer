import { connect } from 'react-redux';
import { DeleteButton } from '../elements/DeleteButton';

// Actions
import { deleteCollection } from '../../actions/collectionActions';

const mapStateToProps = (state, ownProps) => ({
  id: ownProps.id,
  enableRedirect: true,
  redirectPath: "/"
});

const mapDispatchToProps = dispatch => ({
  processButton: id => dispatch(deleteCollection(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteButton);