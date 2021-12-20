import { connect } from 'react-redux';
import { SignUpForm } from './SignUpForm';

// Actions
import { editProfile } from '../../actions/sessionActions';
import { resetRedirect } from '../../actions/uiActions';

const mapStateToProps = state => ({
  errors: state.errors.sessionErrors,
  formType: 'editProfile',
  user: state.users.currentUser,
  redirect: state.ui.redirect
});

const mapDispatchToProps = dispatch => {
  return {
    processForm: (user) => dispatch(editProfile(user)),
    resetRedirect: () => dispatch(resetRedirect())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpForm);