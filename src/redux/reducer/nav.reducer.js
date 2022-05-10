const initialState = {
  navBoolean: false,
};

const navReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_NAV':
      return {
        ...state,
        navBoolean: !state.navBoolean,
      };

    default:
      return state;
  }
};

export default navReducer;
