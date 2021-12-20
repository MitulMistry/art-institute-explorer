import { connect } from 'react-redux';
import { SignUpForm } from './SignUpForm';

// Actions
import { signUp } from '../../actions/sessionActions';
import { resetRedirect } from '../../actions/uiActions';

const mapStateToProps = state => ({
  errors: state.errors.sessionErrors,
  formType: 'signUp',
  user: null,
  redirect: state.ui.redirect
});

const mapDispatchToProps = dispatch => {
  return {
    processForm: (user) => dispatch(signUp(user)),
    resetRedirect: () => dispatch(resetRedirect)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpForm);