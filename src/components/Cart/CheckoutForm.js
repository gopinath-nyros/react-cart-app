import { useRef, useState } from "react";
import classes from "./CheckoutForm.module.css";

// check empty or not
const isEmpty = (value) => value.trim() !== "";
const isFiveChar = (value) => value.trim().length === 5;

const CheckoutForm = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });
  const nameRef = useRef();
  const streetRef = useRef();
  const postalRef = useRef();
  const cityRef = useRef();

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const name = nameRef.current.value;
    const street = streetRef.current.value;
    const postal = postalRef.current.value;
    const city = cityRef.current.value;

    const nameIsValid = isEmpty(name);
    const streetIsValid = isEmpty(street);
    const postalIsValid = isFiveChar(postal);
    const cityIsValid = isEmpty(city);

    setFormInputsValidity({
      name: nameIsValid,
      street: streetIsValid,
      postal: postalIsValid,
      city: cityIsValid,
    });

    const formIsValid =
      nameIsValid && streetIsValid && postalIsValid && cityIsValid;

    if (!formIsValid) {
      return;
    }

    // formData
    const formData = {
      name,
      street,
      postal,
      city,
    };

    console.log(`${name}-${street}-${postal}-${city} `);
    props.onSubmit(formData);
  };

  // if invalid classes
  const nameControlClasses = `${classes.control} ${
    formInputsValidity.name ? "" : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    formInputsValidity.street ? "" : classes.invalid
  }`;
  const postalControlClasses = `${classes.control} ${
    formInputsValidity.postal ? "" : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    formInputsValidity.city ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={formSubmitHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameRef} />
        {!formInputsValidity.name && <p>please enter a valid name </p>}
      </div>

      <div className={streetControlClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetRef} />
        {!formInputsValidity.street && <p>please enter a valid street </p>}
      </div>

      <div className={postalControlClasses}>
        <label htmlFor='postal'>Postal</label>
        <input type='text' id='postal' ref={postalRef} />
        {!formInputsValidity.postal && (
          <p>please enter a valid postal 5 digit code </p>
        )}
      </div>

      <div className={cityControlClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityRef} />
        {!formInputsValidity.city && <p>please enter a valid city </p>}
      </div>

      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit} type='submit'>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
