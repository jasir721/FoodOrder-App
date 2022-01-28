import classes from "./Cart.module.css";
import React, { useContext } from "react";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";

import { useState } from "react";
const Cart = (props) => {
	const [isChecked, setChecked] = useState(false);
	const [isSubmitting, setisSubmitting] = useState(false);
	const [didSubmit, setdidSubmit] = useState(false);

	const cartCtx = useContext(CartContext);

	const cartItemRemovehandler = (id) => {
		cartCtx.removeItem(id);
	};
	const cartItemAddHandler = (item) => {
		cartCtx.addItem(item);
	};

	const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
	const hasItems = cartCtx.items.length > 0;

	const orderHandler = () => {
		setChecked(true);
	};

	const submitOrderHandler = async (userData) => {
		setisSubmitting(true);
		await fetch(
			"https://foodorder-77181-default-rtdb.firebaseio.com/orders.json",
			{
				method: "POST",
				body: JSON.stringify({
					user: userData,
					orderedItems: cartCtx.items,
				}),
			}
		);
		setisSubmitting(false);
		setdidSubmit(true);
		cartCtx.clearCart();
	};

	const cartItems = (
		<ul className={classes["cart-items"]}>
			{cartCtx.items.map((item) => (
				<CartItem
					key={item.id}
					name={item.name}
					amount={item.amount}
					price={item.price}
					onRemove={cartItemRemovehandler.bind(null, item.id)}
					onAdd={cartItemAddHandler.bind(null, item)}
				/>
			))}
		</ul>
	);

	const ModalActions = (
		<div className={classes.actions}>
			<button className={classes["button--alt"]} onClick={props.onClose}>
				Close
			</button>
			{hasItems && (
				<button className={classes.button} onClick={orderHandler}>
					Order
				</button>
			)}
		</div>
	);

	const cartModalContent = (
		<React.Fragment>
			{cartItems}
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>
			{isChecked && (
				<Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
			)}
			{!isChecked && ModalActions}
		</React.Fragment>
	);

	const isSubmittingModalContent = <p>Sending order data....</p>;
	const deidSubmitModal = <p>Successfully sent the order!!</p>;

	return (
		<Modal onClose={props.onClose}>
			{cartModalContent}
			{!isSubmitting && !didSubmit && cartModalContent}
			{isSubmitting && isSubmittingModalContent}
			{!isSubmitting &&  didSubmit && deidSubmitModal}
		</Modal>
	);
};
export default Cart;
