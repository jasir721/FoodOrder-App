import classes from "./Modal.module.css";
import ReactDom from "react-dom";
import { Fragment } from "react";
const Backdrop = (props) => {
	return <div className={classes.backdrop} onClick={props.onClose}></div>;
};

const ModalOverlay = (props) => {
	return (
		<div className={classes.modal}>
			<div className={classes.content}>{props.children}</div>
		</div>
	);
};
const portalElemnt = document.getElementById("overlays");

const Modal = (props) => {
	return (
		<Fragment>
			{ReactDom.createPortal(<Backdrop onClose={props.onClose}/>, portalElemnt)};
			{ReactDom.createPortal(
				<ModalOverlay>{props.children}</ModalOverlay>,
				portalElemnt
			)}
		</Fragment>
	);
};

export default Modal;
