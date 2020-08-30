import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Logo from "../UI/Logo/Logo";
import Button from "../UI/Button/Button";

import * as actions from "../../store/actions/actions";

import styles from "./Lobby.module.css";

const Lobby = props => {
	const { resetQuiz } = props;

	useEffect(() => {
		resetQuiz();
	}, [resetQuiz]);

	return (
		<div className={styles.lobby}>
			<div className={styles.logoContainer}>
				<Logo />
			</div>
			<div className={styles.buttonsContainer}>
				<Link to="/create-room">
					<Button>Create Room</Button>
				</Link>
				<Link to="/join-room">
					<Button>Join Room</Button>
				</Link>
			</div>
		</div>
	);
};

const mapDispatchToProps = dispatch => {
	return {
		resetQuiz: () => dispatch(actions.resetQuiz()),
	};
};

export default connect(null, mapDispatchToProps)(Lobby);
