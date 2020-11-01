import {
  BRAND_ADD_FAIL,
  BRAND_ADD_REQUEST,
  BRAND_ADD_RESET,
  BRAND_ADD_SUCCESS,
  BRAND_DELETE_FAIL,
  BRAND_DELETE_REQUEST,
  BRAND_DELETE_SUCCESS,
  BRAND_EDIT_FAIL,
  BRAND_EDIT_REQUEST,
  BRAND_EDIT_SUCCESS,
  BRAND_LIST_FAIL,
  BRAND_LIST_REQUEST,
  BRAND_LIST_RESET,
  BRAND_LIST_SUCCESS,
  BRAND_UPDATE_FAIL,
  BRAND_UPDATE_REQUEST,
  BRAND_UPDATE_SUCCESS,
} from "../constants/brandConstants";

export const brandListReducer = (state = { brands: [] }, action) => {
  switch (action.type) {
    case BRAND_LIST_REQUEST:
      return { ...state, loading: true };

    case BRAND_LIST_SUCCESS:
      return { ...state, brands: action.payload, loading: false };
    case BRAND_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    case BRAND_LIST_RESET:
      return { brands: [] };
    default:
      return state;
  }
};

export const brandCreateReducer = (state = { brand: {} }, action) => {
  switch (action.type) {
    case BRAND_ADD_REQUEST:
      return { ...state, loading: true };
    case BRAND_ADD_SUCCESS:
      return { loading: false, success: true, brand: action.payload };
    case BRAND_ADD_FAIL:
      return { loading: false, error: action.payload };
    case BRAND_ADD_RESET:
      return {};
    default:
      return state;
  }
};
export const brandDetailsReducer = (state = { brand: {} }, action) => {
  switch (action.type) {
    case BRAND_EDIT_REQUEST:
      return { ...state, loading: true };
    case BRAND_EDIT_SUCCESS:
      return { loading: false, brand: action.payload };
    case BRAND_EDIT_FAIL:
      return { ...state, loading: false, error: action.payload };
    case "BRAND_DETAIL_RESET":
      return { brand: {} };
    default:
      return state;
  }
};

export const brandUpdateReducer = (state = { brand: {} }, action) => {
  switch (action.type) {
    case BRAND_UPDATE_REQUEST:
      return { ...state, loading: true };
    case BRAND_UPDATE_SUCCESS:
      return { loading: false, success: true, brand: action.payload };
    case BRAND_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case "BRAND_UPDATE_RESET":
      return { brand: {} };
    default:
      return state;
  }
};

export const brandDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case BRAND_DELETE_REQUEST:
      return { loading: true };
    case BRAND_DELETE_SUCCESS:
      return { loading: false, success: true };
    case BRAND_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case "BRAND_DELETE_RESET":
      return {};
    default:
      return state;
  }
};
