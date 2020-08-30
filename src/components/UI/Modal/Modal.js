import React from "react";
import Backdrop from "../Backdrop/Backdrop";

import styles from "./Modal.module.css";

const Modal = props => {
	const modalStyle = {
		opacity: props.showModal ? "1" : "0",
		transform: props.showModal
			? "translate(0%,0%) scale(1)"
			: "translate(0vw,100vh) scale(0)",
	};

	console.log(modalStyle)
	return (
		<>
			<Backdrop showBackdrop={props.showModal} closed={props.closed} />
			<div className={styles.Modal} style={modalStyle}>
				{props.children}
			</div>
		</>
	);
};

const areEqual = (prevProps, nextProps) =>
	nextProps.children === prevProps.children && nextProps.showModal === prevProps.showModal;

export default React.memo(Modal, areEqual);
