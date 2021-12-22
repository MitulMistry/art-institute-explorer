import { connect } from 'react-redux';
import { LoginForm } from './LoginForm';

// Actions
import { login } from '../../actions/sessionActions';
import { resetRedirect } from '../../actions/uiActions';
import { resetSessionErrors } from '../../actions/sessionActions';

const mapStateToProps = state => ({
  errors: state.errors.sessionErrors,
  redirect: state.ui.redirect
});

const mapDispatchToProps = dispatch => ({
  processForm: user => dispatch(login(user)),
  resetRedirect: () => dispatch(resetRedirect()),
  resetSessionErrors: () => dispatch(resetSessionErrors())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);