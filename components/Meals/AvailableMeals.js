import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItems/MealItem";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
	const [meals, setmeals] = useState([]);
	const [isLoading, setisLoading] = useState(true);
	const [httpError,sethttpError] = useState(null);
	useEffect(() => {
		const fetchMeals = async () => {
			const response = await fetch(
				"https://foodorder-77181-default-rtdb.firebaseio.com/meals.json"
			);
			if(!response.ok)
			{
				throw new Error('Something went wrong!!');
			}
			const responseData = await response.json();
			const loadedMeals = [];
			for (const key in responseData) {
				loadedMeals.push({
					id: key,
					name: responseData[key].name,
					price: responseData[key].price,
					description: responseData[key].description,
				});
			}
			setmeals(loadedMeals);
			setisLoading(false);
		};
		fetchMeals().catch((error)=>{
			setisLoading(false);
			sethttpError(error.message);
		});
		
	}, []);

	if (isLoading) {
		return (
			<section className={classes.MealsLoading}>
				<p>Loading......</p>
			</section>
		);
	}
	if(httpError)
	{
		<section className={classes.MealsError}>
			<p>{httpError}</p>
		</section>
	}
	const mealslist = meals.map((meal) => (
		<MealItem
			key={meal.id}
			id={meal.id}
			name={meal.name}
			description={meal.description}
			price={meal.price}
		/>
	));
	return (
		<section className={classes.meals}>
			<Card>
				<ul>{mealslist}</ul>
			</Card>
		</section>
	);
};
export default AvailableMeals;
