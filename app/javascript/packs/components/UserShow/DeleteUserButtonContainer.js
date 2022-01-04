import { connect } from 'react-redux';
import { DeleteButton } from '../elements/DeleteButton';

// Actions
import { deleteAccount } from '../../actions/sessionActions'; 

const mapStateToProps = (state, ownProps) => ({
  id: ownProps.id
});

const mapDispatchToProps = dispatch => ({
  processButton: id => dispatch(deleteAccount(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteButton);