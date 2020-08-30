import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import CreateRoom from "./CreateRoom/CreateRoom";
import JoinRoom from "./JoinRoom/JoinRoom";
import Logo from "../UI/Logo/Logo";
import Button from "../UI/Button/Button";
import Modal from "../UI/Modal/Modal";

import * as actions from "../../store/actions/actions";

import styles from "./Lobby.module.css";

const Lobby = props => {
	const [showJoinRoom, setShowJoinRoom] = useState(false);
	const [showCreateRoom, setShowCreateRoom] = useState(false);

	const { resetQuiz } = props;

	useEffect(() => {
		resetQuiz();
	}, [resetQuiz]);

	const createRoomClicked = () => {
		console.log("clicked");
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

	// const createRoomModal = <CreateRoom showModal={showCreateRoom} closed={closeModal} />;
	// const joinRoomModal = <JoinRoom showModal={showJoinRoom} closed={closeModal} />;
	// const roomModal = showCreateRoom ? createRoomModal : showJoinRoom ? joinRoomModal : null;

	return (
		<div className={styles.lobby}>
			<CreateRoom showModal={showCreateRoom} closed={closeModal} />
			<JoinRoom showModal={showJoinRoom} closed={closeModal} />
			<div className={styles.logoContainer}>
				<Logo />
			</div>
			<div className={styles.buttonsContainer}>
				<Button clicked={createRoomClicked}>Create Room</Button>
				<Button clicked={joinRoomClicked}>Join Room</Button>
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
