import React, { useEffect } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions/actions";

const Lobby = props => {
	const { resetQuiz } = props;

	useEffect(() => {
		resetQuiz();
	}, [resetQuiz]);

	const joinRoomHandler = () => {
		props.history.push("/join-room");
	};

	const createRoomHandler = () => {
		props.history.push("./create-room");
	};

	return (
		<>
			<button onClick={joinRoomHandler}>Join Room</button>
			<button onClick={createRoomHandler}>Create Room</button>
		</>
	);
};

const mapDispatchToProps = dispatch => {
	return {
		resetQuiz: () => dispatch(actions.resetQuiz()),
	};
};

export default connect(null, mapDispatchToProps)(Lobby);
