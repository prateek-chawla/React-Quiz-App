import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck,faCopy } from "@fortawesome/free-solid-svg-icons";

import styles from "./Button.module.css";

const Button = props => {

	const icons = {
		check: faCheck,
		copy: faCopy,
	};

	return (
		<div className={styles.cardButton} onClick={props.clicked}>
            <div className={styles.cardIcon}>
                <FontAwesomeIcon icon={icons[props.icon]} />
            </div>
            <div className={styles.cardText}>
                {props.children}
            </div>
		</div>
	);
};

export default Button;
