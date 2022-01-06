import { connect } from 'react-redux';
import UserShowParent from './UserShowParent';

// Actions
import { fetchUser } from '../../actions/userActions';

const mapStateToProps = state => ({
  userShow: state.entities.users.userShow,
  owned: Boolean(state.entities.users.userShow &&
    state.entities.users.userShow.id === state.session.id)
});

const mapDispatchToProps = dispatch => ({
  fetchUser: id => dispatch(fetchUser(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserShowParent);