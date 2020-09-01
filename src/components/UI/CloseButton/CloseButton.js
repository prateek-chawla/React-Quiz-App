import React from "react";
import styles from "./CloseButton.module.css";

const CloseButton = props => {
	return (
		<div onClick={props.clicked} className={styles.closeButton}>
			<div className={styles.left} />
			<div className={styles.right} />
		</div>
	);
};

export default CloseButton;
