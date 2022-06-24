function reducer(state, action) {
  switch (action.type) {
    case 'SETUP_USER':
      const { user, token } = action.payload;
      return {
        ...state,
        user,
        token,
      };
    case 'LOGOUT_USER':
      return {
        ...state,
        user: null,
        token: null,
      };
    case 'TOGGLE_SIDEBAR':
      return {
        ...state,
        showSidebar: !state.showSidebar,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload.user,
      };
    case 'SETUP_EXPENSES':
      const { expenses, count, numOfPages } = action.payload;
      return {
        ...state,
        expenses,
        count,
        numOfPages,
      };
    case 'SETUP_CATEGORIES':
      const { categories } = action.payload;
      return {
        ...state,
        categories,
      };
    default:
      throw new Error(`Action type: ${action.type} does not exist`);
  }
}

export default reducer;
