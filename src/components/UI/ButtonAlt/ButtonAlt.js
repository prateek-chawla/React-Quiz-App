import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

import styles from "./ButtonAlt.module.css";

const Button = props => {
	return (
		<button
			className={styles.button}
			disabled={props.disabled}
			onClick={props.clicked}
		>
			<div className={styles.buttonCircle}>
				<FontAwesomeIcon icon={faAngleRight} className={styles.buttonIcon} />
			</div>
			<span className={styles.buttonText}>{props.children}</span>
		</button>
	);
};

export default Button;
