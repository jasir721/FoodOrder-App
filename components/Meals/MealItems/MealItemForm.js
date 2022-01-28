import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";
import { useRef , useState} from "react";

const MealItemForm = (props) => {
	const [amountIsValid,setAmountIsValid] = useState(true);
	const amountinputRef = useRef(null);
	const submithandler = (event) => {
		event.preventDefault();
		const enteredAmoint = amountinputRef.current.value;
		const enteredAmonumber = +enteredAmoint;
		if (
			enteredAmoint.trim().length === 0 ||
			enteredAmonumber < 1 ||
			enteredAmonumber > 5
		) {
			setAmountIsValid(false);
			return;
		}
		props.onAddtoCart(enteredAmonumber);
	};
	return (
		<form className={classes.form} onSubmit={submithandler}>
			<Input
				ref={amountinputRef}
				label="Amount"
				input={{
					id: "ampunt",
					type: "number",
					min: "1",
					max: "5",
					step: "1",
					defaultValue: "1",
				}}
			/>
			<button>+Add</button>
			{!amountIsValid && <p>Please enter a valid amount (1-5)</p>}
		</form>
	);
};
export default MealItemForm;
