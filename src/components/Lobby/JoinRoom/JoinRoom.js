import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Spinner from "../../UI/Spinner/Spinner";
import ErrorModal from "../../UI/Error/Error";

import { socket } from "../../../index";

import * as actions from "../../../store/actions/actions";

const JoinRoom = props => {
	const [roomID, setRoomID] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const { startQuiz, history } = props;

	useEffect(() => {
		socket.on("start_quiz_ack", room => {
			startQuiz(room);
			history.push(`/quiz`);
		});

		return () => {
			socket.off("start_quiz_ack");
		};
		//eslint-disable-next-line
	}, []);

	const changeRoomID = event => {
		setRoomID(event.target.value);
	};

	const submitJoinRoomHandler = event => {
		event.preventDefault();
		setLoading(true);
		socket.emit("join_room", roomID, response => {
			if (response.status === "Success") {
				props.setIsHost();
				setLoading(false);
				setError(null);
			} else {
				setError(response.message);
				setLoading(false);
			}
		});
	};

	let joinRoomForm = (
		<div>
			<form onSubmit={submitJoinRoomHandler}>
				<input type="text" onChange={changeRoomID} value={roomID} required />
				<button type="submit">Join Room</button>
			</form>
		</div>
	);

	let errorModal = error ? <ErrorModal message={error} /> : null;

	return (
		<>
			{errorModal}
			<Link to="/">Lobby</Link>
			<Link to="/create-room">Create Room Instead</Link>
			{loading ? <Spinner /> : joinRoomForm}
		</>
	);
};

const mapDispatchToProps = dispatch => {
	return {
		startQuiz: roomID => dispatch(actions.startQuiz(roomID)),
		setIsHost: () => dispatch(actions.setIsHost(false)),
	};
};

export default connect(null, mapDispatchToProps)(JoinRoom);
