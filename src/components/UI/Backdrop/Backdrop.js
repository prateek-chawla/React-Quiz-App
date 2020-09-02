import React from "react";
import styles from "./Backdrop.module.css";

const Backdrop = ({ showBackdrop, closed }) =>
	showBackdrop ? <div className={styles.Backdrop} onClick={closed} /> : null;

export default Backdrop;
