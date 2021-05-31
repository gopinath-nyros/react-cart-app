import React, { useReducer } from "react";
import CartContext from "./cart-context";

// default cart state
const defaultCartState = {
  items: [],
  totalAmount: 0,
};

// reducer function
const cartReducer = (state, action) => {
  // logic to add items to cart
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    // find the index
    const existingCartIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    // accessing that existing item using index
    const existingCartItem = state.items[existingCartIndex];

    let updatedItems;
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  // handling remove item from cart logic
  if (action.type === "REMOVE") {
    // find the index
    const existingCartIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    // existing item
    const existingItem = state.items[existingCartIndex];
    // reduce the amount
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    // check for the last item in the cart and remove it from array
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    }
    // if the item in cart is greater than 1, we need to update the amount
    else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "CLEAR") {
    return defaultCartState;
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
