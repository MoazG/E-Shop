import {
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_RESET,
  CATEGORY_UPDATE_REQUEST,
  CATEGORY_UPDATE_SUCCESS,
  CATEGORY_UPDATE_FAIL,
  CATEGORY_ADD_REQUEST,
  CATEGORY_ADD_SUCCESS,
  CATEGORY_ADD_FAIL,
  CATEGORY_ADD_RESET,
  CATEGORY_EDIT_REQUEST,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_FAIL,
  CATEGORY_EDIT_SUCCESS,
  CATEGORY_EDIT_FAIL,
  CATEGORY_DELETE_SUCCESS,
} from "../constants/categoryConstants";

export const categoryListReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case CATEGORY_LIST_REQUEST:
      return { ...state, loading: true };

    case CATEGORY_LIST_SUCCESS:
      return { ...state, categories: action.payload, loading: false };
    case CATEGORY_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    case CATEGORY_LIST_RESET:
      return { categories: [] };
    default:
      return state;
  }
};

export const categoryCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_ADD_REQUEST:
      return { loading: true };
    case CATEGORY_ADD_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case CATEGORY_ADD_FAIL:
      return { loading: false, error: action.payload };
    case CATEGORY_ADD_RESET:
      return {};
    default:
      return state;
  }
};
export const categoryDetailsReducer = (state = { category: {} }, action) => {
  switch (action.type) {
    case CATEGORY_EDIT_REQUEST:
      return { ...state, loading: true };
    case CATEGORY_EDIT_SUCCESS:
      return { loading: false, category: action.payload };
    case CATEGORY_EDIT_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const categoryUpdateReducer = (state = { category: {} }, action) => {
  switch (action.type) {
    case CATEGORY_UPDATE_REQUEST:
      return { loading: true };
    case CATEGORY_UPDATE_SUCCESS:
      return { loading: false, success: true, category: action.payload };
    case CATEGORY_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case "CATEGORY_UPDATE_RESET":
      return { category: {} };
    default:
      return state;
  }
};

export const categoryDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_DELETE_REQUEST:
      return { loading: true };
    case CATEGORY_DELETE_SUCCESS:
      return { loading: false, success: true };
    case CATEGORY_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case "CATEGORY_DELETE_RESET":
      return {};
    default:
      return state;
  }
};
export const selectedCategoryReducer = (
  state = { brand: [], category: [] },
  action
) => {
  switch (action.type) {
    case "CATEGORY_SELECTED":
      return { ...state, ...action.payload };
    default:
      return {};
  }
};
