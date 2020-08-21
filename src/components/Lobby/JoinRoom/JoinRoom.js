import React, { useEffect, useState } from "react";
import { socket } from "../../../index";
const JoinRoom = props => {
	const [roomID, setRoomID] = useState("");
	const joinRoomHandler = event => {
		event.preventDefault();
		console.log("Join Room");
		socket.emit("join_room", roomID, response => {
			if (response.status === "Success") {

			} else {
				
			}
			// console.log(`Connected Room ${response}`)
		});
	};
	return (
		<div>
			<form onSubmit={joinRoomHandler}>
				<input type="text" onChange={setRoomID} value={roomID} />
				<button type="submit">Join Room</button>
			</form>
		</div>
	);
};

export default JoinRoom;
