import { connect } from 'react-redux';
import CollectionShowParent from './CollectionShowParent';

// Actions
import { fetchCollection } from '../../actions/collectionActions';

const mapStateToProps = state => ({
  collectionShow: state.entities.collections.collectionShow,
  collectionComments: state.entities.collectionComments.collectionCommentsArray,
  loggedIn: Boolean(state.session.id),
  owned: Boolean(state.entities.collections.collectionShow && 
    state.entities.collections.collectionShow.user.id === state.session.id)
});

const mapDispatchToProps = dispatch => ({
  fetchCollection: id => dispatch(fetchCollection(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionShowParent);