import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { faCopy } from "@fortawesome/free-regular-svg-icons";

import { joinClasses } from "../../../../utils/general";
import styles from "./Button.module.css";

const Button = props => {
	const icons = {
		join: faSignInAlt,
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
