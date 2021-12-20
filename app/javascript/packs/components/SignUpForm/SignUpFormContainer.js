import { connect } from 'react-redux';
import { SignUpForm } from './SignUpForm';

// Actions
import { signUp } from '../../actions/sessionActions';

const mapStateToProps = state => ({
  errors: state.errors.sessionErrors,
  formType: 'signUp',
  user: null
});

const mapDispatchToProps = dispatch => {
  return {
    processForm: (user) => dispatch(signUp(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpForm);