import { useReducer } from "react";
import { combineReducers } from "redux";
import {
  UPDATE_PRODUCTS,
  ADD_TO_CART,
  UPDATE_CART_QUANTITY,
  REMOVE_FROM_CART,
  ADD_MULTIPLE_TO_CART,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  CLEAR_CART,
  TOGGLE_CART,
} from "./actions";

//providing an initial state value so the rest of the reducer has data to work with. this will be references with (state = initialState, action below).
const initialState = {
  products: [],
  categories: [],
  currentCategory: "",
  cart: [],
  //default cartOpen to equal falsey
  cartOpen: false,
};

//reducers are functions that take the current state and an action as arguments, and return a new state result. using below the initialState created above as a  default
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    //returns copy with updated array
    case UPDATE_PRODUCTS:
      return {
        ...state,
        products: [...action.products],
      };

    //returns copy with updated array
    case ADD_TO_CART:
      return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, action.product],
      };

    //returns copy with updated array
    case ADD_MULTIPLE_TO_CART:
      return {
        ...state,
        cart: [...state.cart, ...action.products],
      };

    //returns copy with updated array, keep cart open to true for mapping.
    case UPDATE_CART_QUANTITY:
      return {
        ...state,
        cartOpen: true,
        cart: state.cart.map((product) => {
          //if ids match update the quantity
          if (action._id === product._id) {
            product.purchaseQuantity = action.purchaseQuantity;
          }
          return product;
        }),
      };

    //if ids match, remove from cart and update as "newState"
    case REMOVE_FROM_CART:
      let newState = state.cart.filter((product) => {
        return product._id !== action._id;
      });

      return {
        ...state,
        cartOpen: newState.length > 0,
        cart: newState,
      };

    //return an empty cart
    case CLEAR_CART:
      return {
        ...state,
        cartOpen: false,
        cart: [],
      };

    //move in cart
    case TOGGLE_CART:
      return {
        ...state,
        cartOpen: !state.cartOpen,
      };

    //returns copy with updated array
    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories: [...action.categories],
      };

    //returns copy with updated array
    case UPDATE_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.currentCategory,
      };

    //if the reducer does not recognize any of the action types, this returns unhcanged
    default:
      return state;
  }
};

// these are not needed or used above
// export function useProductReducer(initialState) {
//   return useReducer(reducer, initialState);
// }

//exporting the correct funtion const from abover
export default reducer;
