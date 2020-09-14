import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { socket } from "../../index";

import CreateRoom from "./CreateRoom/CreateRoom";
import JoinRoom from "./JoinRoom/JoinRoom";
import Logo from "../UI/Logo/Logo";
import Button from "../UI/Button/Button";

import * as actions from "../../store/actions/actions";

import styles from "./Lobby.module.css";

const Lobby = props => {
	console.log(props);
	const [showJoinRoom, setShowJoinRoom] = useState(false);
	const [showCreateRoom, setShowCreateRoom] = useState(false);

	const { resetQuiz, setOpponentLeft } = props;
	const redirectedFromQuiz = props.location.state && props.location.state.from === "/quiz";

	useEffect(() => {
		if (redirectedFromQuiz) resetQuiz();
		socket.on("opponent_left", () => {
			setOpponentLeft();
			closeModal();
		});
		return () => {
			socket.off("opponent_left");
		};
	}, [resetQuiz, setOpponentLeft, redirectedFromQuiz]);

	const createRoomClicked = () => {
		setShowCreateRoom(true);
		setShowJoinRoom(false);
	};
	const joinRoomClicked = () => {
		setShowCreateRoom(false);
		setShowJoinRoom(true);
	};

	const closeModal = () => {
		setShowJoinRoom(false);
		setShowCreateRoom(false);
	};

	const blurred = showCreateRoom || showJoinRoom ? { filter: "blur(15px)" } : null;
	return (
		<div className={styles.lobby}>
			<CreateRoom showModal={showCreateRoom} closed={closeModal} />
			<JoinRoom showModal={showJoinRoom} closed={closeModal} />
			<div className={styles.logoContainer} style={blurred}>
				<Logo triggerLogoAnimation={!redirectedFromQuiz} />
			</div>
			<div className={styles.buttonsContainer} style={blurred}>
				<Button clicked={createRoomClicked}>Create Room</Button>
				<Button clicked={joinRoomClicked}>Join Room</Button>
			</div>
		</div>
	);
};

const mapDispatchToProps = dispatch => {
	return {
		resetQuiz: () => dispatch(actions.resetQuiz()),
		setOpponentLeft: () => dispatch(actions.setOpponentLeft()),
	};
};

export default connect(null, mapDispatchToProps)(Lobby);
