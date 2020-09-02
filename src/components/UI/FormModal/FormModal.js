import React from "react";
import { CSSTransition } from "react-transition-group";

import Backdrop from "../Backdrop/Backdrop";
import styles from "./FormModal.module.css";
import transitionStyles from "./FormModalAnimation.module.css";

const FormModal = props => {
	return (
		<>
			<Backdrop showBackdrop={props.showModal} closed={props.closed} />
			<CSSTransition
				in={props.showModal}
				classNames={{ ...transitionStyles }}
				timeout={400}
				mountOnEnter
				unmountOnExit
			>
				<div className={styles.modal}>
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
