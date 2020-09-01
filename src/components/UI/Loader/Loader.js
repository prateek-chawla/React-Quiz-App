import React from "react";
import styles from "./Loader.module.css";

const Loader = () => {
	return (
		<div className={styles.loader}>
			<div className={styles.loader__circle} />
			<div className={styles.loader__circle} />
			<div className={styles.loader__circle} />
		</div>
	);
};

export default Loader;
