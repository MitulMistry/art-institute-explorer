import { connect } from 'react-redux';
import { SignUpForm } from './SignUpForm';

// Actions
import { editProfile } from '../../actions/sessionActions';

const mapStateToProps = state => ({
  errors: state.errors.sessionErrors,
  formType: 'editProfile',
  user: state.users.currentUser
});

const mapDispatchToProps = dispatch => {
  return {
    processForm: (user) => dispatch(editProfile(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpForm);