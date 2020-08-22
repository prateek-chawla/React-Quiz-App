import React from "react";
import "./Spinner.css";

// UI Spinner/Loader
const spinner = props => (
	<div className="spinner">
		<div className="circle1" />
		<div className="circle2" />
		<div className="circle3" />
		<div className="activeCircle" />
	</div>
);

export default spinner;
