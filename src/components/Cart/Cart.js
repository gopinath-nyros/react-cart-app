import React, { useContext, useState, Fragment } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import CheckoutForm from "../Cart/CheckoutForm";

const Cart = (props) => {
  const [checkoutForm, setCheckoutForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);
  const totalAmount = `${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    console.log(id);
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    console.log({ ...item, amount: 1 });
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const showCheckoutFormHandler = () => {
    setCheckoutForm(true);
  };

  const submitOrderHandler = async (formData) => {
    setIsSubmitting(true);
    // fetch call
    const url =
      "https://react-http-form-food-order-default-rtdb.firebaseio.com/orders.json";
    await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        user: formData,
        orderedItems: cartCtx.items,
      }),
    });
    setIsSubmitting(false);
    setDidSubmit(true);
    // clear cart after ordering
    cartCtx.clearCart();
  };

  const modalActions = (
    <div className={classes.actions}>
      <button onClick={props.hideCart} className={classes["button--alt"]}>
        close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={showCheckoutFormHandler}>
          order
        </button>
      )}
    </div>
  );

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const cartModalContent = (
    <Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>total amount</span>
        <span>{totalAmount}</span>
      </div>
      {checkoutForm && (
        <CheckoutForm onSubmit={submitOrderHandler} onCancel={props.hideCart} />
      )}
      {!checkoutForm && modalActions}
    </Fragment>
  );

  // when order is processed
  const isSubmittingModalContent = <p>Sending order data...</p>;

  // done order processing
  const doneOrderSubmitting = (
    <Fragment>
      <p>Order placed successfully</p>
      <div className={classes.actions}>
        <button onClick={props.hideCart} className={classes.button}>
          close
        </button>
      </div>
    </Fragment>
  );

  return (
    <Modal hideCart={props.hideCart}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && doneOrderSubmitting}
    </Modal>
  );
};

export default Cart;
