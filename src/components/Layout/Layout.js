import React from "react";
import styles from "./Layout.module.css";

const Layout = props => {
	return (
		<div className={styles.background}>
			<div className={styles.layout}>{props.children}</div>
		</div>
	);
};

export default Layout;
