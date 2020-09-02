import React from "react";
import { CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

import Backdrop from "../Backdrop/Backdrop";
import styles from "./FormModal.module.css";
import transitionStyles from "./FormModalAnimation.module.css";

const FormModal = props => {
	const errorStyle = {
		opacity: props.error ? "1" : "0",
		transform: props.error ? "translateY(-80%)" : "translateY(0)",
	};
	return (
		<>
			<Backdrop showBackdrop={props.showModal} closed={props.closed} />
			<CSSTransition
				in={props.showModal}
				classNames={{ ...transitionStyles }}
				timeout={400}
				mountOnEnter
				unmountOnExit
				onExited={props.cleanup}
			>
				<div className={styles.modal}>
					<div className={styles.errorSlider} style={errorStyle}>
						<FontAwesomeIcon icon={faExclamationCircle} /> {props.error}
					</div>
					<div className={styles.upper}>{props.title}</div>
					<div className={styles.lower}>
						<div className={styles.cards}>{props.children}</div>
					</div>
				</div>
			</CSSTransition>
		</>
	);
};

export default FormModal;
