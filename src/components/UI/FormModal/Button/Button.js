import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCopy } from "@fortawesome/free-solid-svg-icons";

import { joinClasses } from "../../../../utils/general";
import styles from "./Button.module.css";

const Button = props => {
	const icons = {
		check: faCheck,
		copy: faCopy,
	};

	const { icon, disabled, clicked, children } = props;

	return (
		<div
			className={joinClasses(styles.cardButton, disabled ? styles.disabled : null)}
			onClick={clicked}
			disabled={disabled}
		>
			<div className={styles.cardIcon}>
				<FontAwesomeIcon icon={icons[icon]} />
			</div>
			<div className={styles.cardText}>{children}</div>
		</div>
	);
};

export default Button;
