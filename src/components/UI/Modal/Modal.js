import React from "react";

import Backdrop from "../Backdrop/Backdrop";
import CloseButton from '../CloseButton/CloseButton'

import styles from "./Modal.module.css";

const Modal = props => {
	const modalStyle = {
		opacity: props.showModal ? "1" : "0",
		transform: props.showModal
			? "translate(-50%,0%) scale(1)"
			: "translate(-50%,100vh) scale(0)",
	};

	return (
		<>
			<Backdrop showBackdrop={props.showModal} closed={props.closed} />
			<div className={styles.Modal} style={modalStyle}>
				<CloseButton clicked={props.closed}/>
				{props.children}
			</div>
		</>
	);
};

const areEqual = (prevProps, nextProps) =>
	nextProps.children === prevProps.children && nextProps.showModal === prevProps.showModal;

export default React.memo(Modal, areEqual);
