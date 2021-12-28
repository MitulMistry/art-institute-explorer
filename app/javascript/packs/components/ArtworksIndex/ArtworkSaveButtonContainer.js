import { connect } from 'react-redux';
import { ArtworkSaveButton } from './ArtworkSaveButton';

// Actions
import { createArtworkSave } from '../../actions/artworkSaveActions';
import { deleteArtworkSave } from '../../actions/artworkSaveActions';

// Since artwork is being passed in as a prop to this container, it will
// not be updated if there are changes to it in the store.
const mapStateToProps = (state, ownProps) => ({
  loggedIn: Boolean(state.session.id),
  savedArtworksAicIds: state.session.savedArtworksAicIds,
  aic_id: ownProps.aic_id
});

const mapDispatchToProps = dispatch => ({
  createArtworkSave: aic_id => dispatch(createArtworkSave(aic_id)),
  deleteArtworkSave: aic_id => dispatch(deleteArtworkSave(aic_id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArtworkSaveButton);