import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Modal from "../../UI/Modal/Modal";
import Spinner from "../../UI/Spinner/Spinner";
import Button from "../../UI/Button/Button"
import ErrorModal from "../../UI/Error/Error";

import { socket } from "../../../index";

import * as actions from "../../../store/actions/actions";
import styles from "./JoinRoom.module.css";

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
		<form onSubmit={submitJoinRoomHandler}>
			<input type="text" onChange={changeRoomID} value={roomID} required />
			<Button type="submit" clicked={submitJoinRoomHandler}>
				Join Room
			</Button>
		</form>
	);

	let errorModal = error ? <ErrorModal message={error} /> : null;

	return (
		<Modal closed={props.closed} showModal={props.showModal}>
			{/* <Spinner /> */}
			{errorModal}
			{console.log(loading)}
			{loading ? <Spinner /> : joinRoomForm}
		</Modal>
	);
};

const mapDispatchToProps = dispatch => {
	return {
		startQuiz: roomID => dispatch(actions.startQuiz(roomID)),
		setIsHost: () => dispatch(actions.setIsHost(false)),
	};
};

export default connect(null, mapDispatchToProps)(JoinRoom);
