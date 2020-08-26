import React, { useState } from "react";

import { connect } from "react-redux";

import Spinner from "../../UI/Spinner/Spinner";
import ErrorModal from "../../UI/Error/Error";

import { socket } from "../../../index";

import * as actions from "../../../store/actions/actions";

const JoinRoom = props => {
	const [roomID, changeRoomID] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const changeRoomID = event => {
		changeRoomID(event.target.value);
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
				console.log("Room creation Error");
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
			{loading ? <Spinner /> : joinRoomForm}
		</>
	);
};

// const mapStateToProps = state => {
// 	return {};
// };

const mapDispatchToProps = dispatch => {
	return {
		setIsHost: () => dispatch(actions.setIsHost(false)),
	};
};

export default connect(null, mapDispatchToProps)(JoinRoom);
