import React, { useRef, useState } from "react";
import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";
const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();
  const onSubmitHandler = (event) => {
    event.preventDefault();
    const enteredAmt = amountInputRef.current.value;
    const enteredAmtNumber = +enteredAmt;
    if (
      enteredAmt.trim().length === 0 ||
      enteredAmtNumber < 1 ||
      enteredAmtNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }
    props.onAddToCart(enteredAmtNumber);
  };

  return (
    <form className={classes.form} onSubmit={onSubmitHandler}>
      <Input
        ref={amountInputRef}
        lable={"Amount"}
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+Add</button>
      {!amountIsValid && <p>please enter a valid amount from 1 to 5</p>}
    </form>
  );
};

export default MealItemForm;
