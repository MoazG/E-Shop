import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstants";
import { logout } from "./userActions";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        discount: data.discount,
        countInStock: data.countInStock,
        qty,
      },
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
    dispatch({
      type: "CART_ADD_ITEM_FAIL",
      payload: "Failed to Add product to cart",
    });
  }
};
export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });
  localStorage.setItem("paymentMethod", JSON.stringify(data));
};

export const addToSaved = (id) => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    },
  };
  try {
    dispatch({ type: "SAVED_ITEM_ADD_REQUEST" });
    const { data } = await axios.get(`/api/products/${id}`);
    const savedObject = {
      _id: data._id,
      name: data.name,
      image: data.image[0],
      price: data.price,
    };
    const { data: savedItems } = await axios.patch(
      `/api/users/favorites`,
      { product: savedObject },
      config
    );
    dispatch({
      type: "SAVED_ITEM_ADD_SUCCESS",
      payload: savedItems,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: "SAVED_ITEM_ADD_FAIL",
      payload: message,
    });
  }
};
export const removeFromSaved = (id) => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    },
  };
  try {
    dispatch({ type: "SAVED_ITEM_DELETE_REQUEST" });
    const { data } = await axios.patch(
      `/api/users/favorites/${id}`,
      {},
      config
    );
    dispatch({ type: "SAVED_ITEM_DELETE_SUCCESS", payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: "SAVED_ITEM_DELETE_FAIL",
      payload: message,
    });
  }
};
