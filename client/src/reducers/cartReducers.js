import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_RESET_ITEMS,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstants";
export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;

      const exist = state.cartItems.find((x) => x.product === item.product);
      if (exist) {
        return {
          ...state,
          cartItems: [
            ...state.cartItems.map((x) =>
              x.product === exist.product ? item : x
            ),
          ],
          success: true,
          productName: item.name,
          updated: true,
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
          success: true,
          productName: item.name,
        };
      }
    case "CART_ADD_ITEM_FAIL":
      return { ...state, error: action.payload };
    case "CART_ADD_ITEM_RESET":
      return {
        ...state,
        success: false,
        productName: "",
        updated: false,
        removed: false,
      };
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (elm) => elm.product !== action.payload
        ),
        removed: true,
      };
    case CART_RESET_ITEMS:
      return { cartItems: [], shippingAddress: {} };
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    default:
      return state;
  }
};
