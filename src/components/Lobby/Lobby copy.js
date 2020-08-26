import React, { useEffect, useState } from "react";
// import { connect } from "react-redux";

// import { socket } from "../../index";

// import { Redirect } from "react-router-dom";

const Lobby = props => {
	// useEffect(() => {
	// 	socket.on("start_game_ack", room => {
	// 		// dispatch set quiz in progress
	// 		// dispatch set room
	// 		// console.log("ack_received");
	// 		props.history.push(`/quiz`);
	// 	});

	// 	socket.on("opponent_left", finalScore => {
	// 		// dispatch set Score
	// 		props.history.push("/result");
	// 	});
	// }, []);

	const joinRoomHandler = () => {
		props.history.push("/join-room");
	};

	const createRoomHandler = () => {
		props.history.push("./create-room");
	};

	return (
		<>
			<button onClick={joinRoomHandler}>Join Room</button>
			<button onClick={createRoomHandler} disabled={showCreateRoom}>
				Create Room
			</button>
		</>
	);
};

export default Lobby;
