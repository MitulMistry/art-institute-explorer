import { connect } from 'react-redux';
import { AuthLinks } from './AuthLinks';

// Actions
import { logout } from '../../actions/sessionActions';

const mapStateToProps = state => ({
  currentUser: state.entities.users.currentUser
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthLinks);