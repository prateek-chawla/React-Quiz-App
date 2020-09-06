import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import CreateRoom from "./CreateRoom/CreateRoom";
import JoinRoom from "./JoinRoom/JoinRoom";
import Logo from "../UI/Logo/Logo";
import Button from "../UI/Button/Button";

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
			{/* {showCreateRoom && <CreateRoom showModal={showCreateRoom} closed={closeModal} />} */}
			<CreateRoom showModal={showCreateRoom} closed={closeModal} />
			{/* {showJoinRoom && <JoinRoom showModal={showJoinRoom} closed={closeModal} />} */}
			<JoinRoom showModal={showJoinRoom} closed={closeModal} />
			<div className={styles.logoContainer} style={blurred}>
				<Logo />
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
	};
};

export default connect(null, mapDispatchToProps)(Lobby);
