import React from "react";

const Lobby = props => {

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

export default Lobby;
