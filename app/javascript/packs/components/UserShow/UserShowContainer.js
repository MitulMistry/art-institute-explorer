import { connect } from 'react-redux';
import UserShowParent from './UserShowParent';

// Actions
import { fetchUser } from '../../actions/userActions';

const mapStateToProps = state => ({
  userShow: state.entities.users.userShow
});

const mapDispatchToProps = dispatch => ({
  fetchUser: id => dispatch(fetchUser(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserShowParent);