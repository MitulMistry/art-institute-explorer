
const initialState = {};

const collectionsReducer = (state = initialState, action) => {
  let nextState;
  Object.freeze(state);

  switch (action.type) {

    default:
      return state;
  }
}

export default collectionsReducer;