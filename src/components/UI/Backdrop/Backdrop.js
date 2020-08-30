import React from "react";
import styles from "./Backdrop.module.css";

const Backdrop = props =>
	props.showBackdrop ? <div className={styles.Backdrop} onClick={props.closed}></div> : null;

export default Backdrop;
