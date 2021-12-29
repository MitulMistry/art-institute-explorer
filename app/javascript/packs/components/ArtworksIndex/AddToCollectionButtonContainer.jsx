import { connect } from 'react-redux';
import { AddToCollectionButton } from './AddToCollectionButton';

const mapStateToProps = (state, ownProps) => ({
  loggedIn: Boolean(state.session.id),
  aic_id: ownProps.aic_id
});

export default connect(
  mapStateToProps
)(AddToCollectionButton);