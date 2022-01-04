import { connect } from 'react-redux';
import { SignUpForm } from '../SignUpForm/SignUpForm';

// Actions
import { editProfile } from '../../actions/sessionActions';
import { resetRedirect } from '../../actions/uiActions';
import { resetSessionErrors } from '../../actions/sessionActions';

const mapStateToProps = state => ({
  errors: state.errors.sessionErrors,
  formType: 'editProfile',
  user: state.entities.users.currentUser,
  redirect: state.ui.redirect
});

const mapDispatchToProps = dispatch => ({
  processForm: user => dispatch(editProfile(user)),
  resetRedirect: () => dispatch(resetRedirect()),
  resetSessionErrors: () => dispatch(resetSessionErrors())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpForm);