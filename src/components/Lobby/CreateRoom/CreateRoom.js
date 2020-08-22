import React from "react";
import { socket } from "../../../index";

const CreateRoom = props => {
	const startQuizHandler = () => {
		socket.emit("start_game", props.roomID);
	};
	return (
		<div>
			<div>Room id {props.roomID}</div>
			<div>opponent joined : {props.opponentJoined.toString()}</div>
			<button disabled={!props.opponentJoined} onClick={startQuizHandler}>
				Start Quiz
			</button>
		</div>
	);
};

export default CreateRoom;
