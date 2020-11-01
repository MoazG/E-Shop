import axios from "axios";
import {
  BRAND_ADD_FAIL,
  BRAND_ADD_REQUEST,
  BRAND_ADD_SUCCESS,
  BRAND_DELETE_FAIL,
  BRAND_DELETE_REQUEST,
  BRAND_DELETE_SUCCESS,
  BRAND_EDIT_FAIL,
  BRAND_EDIT_REQUEST,
  BRAND_EDIT_SUCCESS,
  BRAND_LIST_FAIL,
  BRAND_LIST_REQUEST,
  BRAND_LIST_SUCCESS,
  BRAND_UPDATE_FAIL,
  BRAND_UPDATE_REQUEST,
  BRAND_UPDATE_SUCCESS,
} from "../constants/brandConstants";
import { logout } from "./userActions";

export const listBrands = () => async (dispatch) => {
  dispatch({ type: BRAND_LIST_REQUEST });
  try {
    const { data } = await axios.get("/api/brands");
    dispatch({ type: BRAND_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: BRAND_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const createBrand = (brand) => async (dispatch, getState) => {
  dispatch({ type: BRAND_ADD_REQUEST });
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post("/api/brands", brand, config);
    dispatch({ type: BRAND_ADD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: BRAND_ADD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const brandDetailsAction = (id) => async (dispatch, getState) => {
  dispatch({ type: BRAND_EDIT_REQUEST });
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/brands/${id}`, config);
    dispatch({ type: BRAND_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: BRAND_EDIT_FAIL,
      payload: message,
    });
  }
};

export const updateBrand = (brand) => async (dispatch, getState) => {
  dispatch({ type: BRAND_UPDATE_REQUEST });
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(`/api/brands/${brand._id}`, brand, config);
    dispatch({ type: BRAND_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: BRAND_UPDATE_FAIL,
      payload: message,
    });
  }
};

export const deleteBrand = (id) => async (dispatch, getState) => {
  dispatch({ type: BRAND_DELETE_REQUEST });
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`/api/brands/${id}`, config);
    dispatch({ type: BRAND_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: BRAND_DELETE_FAIL,
      payload: message,
    });
  }
};
