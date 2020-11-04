export const favoritesItemsAddReducers = (
  state = { favorites: "" },
  action
) => {
  switch (action.type) {
    case "SAVED_ITEM_ADD_REQUEST":
      return { ...state, loading: true };
    case "SAVED_ITEM_ADD_SUCCESS":
      return { success: true, loading: false, favorites: action.payload };
    case "SAVED_ITEM_ADD_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "SAVED_ITEM_ADD_RESET":
      return { favorites: "" };

    default:
      return state;
  }
};

export const favoritesItemsDeleteReducers = (state = {}, action) => {
  switch (action.type) {
    case "SAVED_ITEM_DELETE_REQUEST":
      return { loading: true };
    case "SAVED_ITEM_DELETE_SUCCESS":
      return { loading: false, success: true };
    case "SAVED_ITEM_DELETE_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
