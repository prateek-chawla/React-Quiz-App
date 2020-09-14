import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

import styles from "./Button.module.css";

const Button = props => {
	const faIcon = <FontAwesomeIcon icon={faAngleRight} />;

	return (
		<div className={styles.buttonContainer}>
			<button className={styles.button} disabled={props.disabled} onClick={props.clicked}>
				<span className={styles.leftAngle}>{faIcon}</span>
				<span className={styles.buttonText}>{props.children}</span>
				<span className={styles.rightAngle}>{faIcon}</span>
			</button>

			<svg className={styles.buttonOutline} width="170" height="50">
				{/* prettier-ignore */}
				<rect x="5" y="5" rx="20" ry="20" width="160" height="40" style={{ fill: "none", stroke: "ivory", strokeWidth: 2 }}/>
			</svg>
		</div>
	);
};

export default Button;
