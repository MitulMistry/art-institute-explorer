import { connect } from 'react-redux';
import { NavBar } from './NavBar';

const mapStateToProps = state => ({
  loggedIn: Boolean(state.session.id)
});

export default connect(
  mapStateToProps
)(NavBar);