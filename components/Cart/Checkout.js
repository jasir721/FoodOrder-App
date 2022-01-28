import classes from "./Checkout.module.css";
import { useRef,useState } from "react";

const isEmpty = (value) => value.trim() === "";
const isNotFiveChars = (value) => value.trim().length !== 5;

const Checkout = (props) => {
    const [formInputValidity,setFormValidity] = useState({
        name:true,
        street:true,
        city:true,
        postalCode:true}
    );

	const nameInputRef = useRef();
	const streetInputRef = useRef();
	const postalInputRef = useRef();
	const cityInputRef = useRef();

	const confirmHandler = (event) => {
		event.preventDefault();
		const enterdName = nameInputRef.current.value;
		const enterdStreet = streetInputRef.current.value;
		const enterdPostal = postalInputRef.current.value;
		const enterdCity = cityInputRef.current.value;

		const enteredNameisValid = !isEmpty(enterdName);
		const enterdStreetisValid = !isEmpty(enterdStreet);
		const enterdPostalisValid = !isNotFiveChars(enterdPostal);
		const enterdCityisValid = !isEmpty(enterdCity);

        setFormValidity({
            name:enteredNameisValid,
            street:enterdStreetisValid,
            city:enterdCityisValid,
            postalCode:enterdPostalisValid
        });

		const formisValid =
			enteredNameisValid &&
			enterdStreetisValid &&
			enterdPostalisValid &&
			enterdCityisValid;

        if(formisValid)
        {
            return;
        }

        //Submit the form
        props.onConfirm({
            name:enterdName,
            street:enterdStreet,
            city:enterdCity,
            postalCode:enterdPostal
        });
	};

	return (
		<form className={classes.form} onSubmit={confirmHandler}>
			<div className={classes.control}>
				<label htmlFor="name">Your Name</label>
				<input type="text" id="name" ref={nameInputRef} />
                {!formInputValidity.name && <p>Please enter a valid name !</p> }
			</div>
			<div className={classes.control}>
				<label htmlFor="street">Street</label>
				<input type="text" id="street" ref={streetInputRef} />
                {!formInputValidity.street && <p>Please enter a valid street !</p> }

			</div>
			<div className={classes.control}>
				<label htmlFor="postal">Postal Code</label>
				<input type="text" id="postal" ref={postalInputRef} />
                {!formInputValidity.postalCode && <p>Please enter a valid postal Code !</p> }

			</div>
			<div className={classes.control}>
				<label htmlFor="city">City</label>
				<input type="text" id="city" ref={cityInputRef} />
                {!formInputValidity.city && <p>Please enter a valid City !</p> }

			</div>
			<div className={classes.actions}>
				<button type="button" onClick={props.onCancel}>
					Cancel
				</button>
				<button className={classes.submit}>Confirm</button>
			</div>
		</form>
	);
};

export default Checkout;
