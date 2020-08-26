import React, { useEffect, useState } from "react";
import shortid from "shortid";

import { socket } from "../../index";

import CreateRoom from "./CreateRoom/CreateRoom";
import JoinRoom from "./JoinRoom/JoinRoom";
import { Redirect } from "react-router-dom";

const Lobby = props => {
	const [acceptedRoomID, setAcceptedRoomID] = useState(null);
	const [joinRoomID, setJoinRoomID] = useState("");
	const [loading, setLoading] = useState(false);
	const [showJoinRoom, toggleShowJoinRoom] = useState(false);
	const [showCreateRoom, toggleShowCreateRoom] = useState(false);
	const [opponentJoined, setOpponentJoined] = useState(false);
	const [gameRedirectPath, setGameRedirectPath] = useState(null);

	useEffect(() => {
		socket.on("player_joined", () => {
			setOpponentJoined(true);
			// dispatch setopoonenLEft
			// console.log("set");
		});

		socket.on("start_game_ack", room => {
			// dispatch set quiz in progress
			// dispatch set room
			// console.log("ack_received");
			setGameRedirectPath(`/quiz`);
		});

		socket.on("opponent_left", finalScore => {
			// dispatch set Score
			setGameRedirectPath("/result");
		});
	}, []);

	const changeJoinRoomID = event => {
		setJoinRoomID(event.target.value);
	};

	const joinRoomHandler = () => {
		toggleShowCreateRoom(false);
		toggleShowJoinRoom(true);
	};

	const submitJoinRoomHandler = event => {
		event.preventDefault();
		setLoading(true);
		console.log("Submit Join Room");
		socket.emit("join_room", joinRoomID, response => {
			if (response.status === "Success") {
				// setOpponentJoined(true);
				setLoading(false);
				// console.log(response.roomID);
			} else {
				console.log("Room creation Error");
				// Invalid Room id
				setLoading(false);
			}
			// console.log(`Connected Room ${response}`)
		});
	};

	const createRoomHandler = () => {
		setLoading(true);
		shortid.characters(
			"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@"
		);
		const roomID = shortid.generate();

		socket.emit("create_room", roomID, response => {
			if (response.status === "Success") {
				// console.log(`Room Created ${response.roomID}`);
				setAcceptedRoomID(response.roomID);
				setLoading(false);
				toggleShowCreateRoom(true);
			} else {
				console.log("Room creation Error");
				setLoading(false);
			}
		});
	};

	let room = null;

	// if (loading) lobby = "Loading";
	const Spinner = "Loading";
	if (showCreateRoom)
		room = <CreateRoom roomID={acceptedRoomID} opponentJoined={opponentJoined} />;
	else if (showJoinRoom)
		room = (
			<div>
				<form onSubmit={submitJoinRoomHandler}>
					<input
						type="text"
						onChange={changeJoinRoomID}
						value={joinRoomID}
						required
					/>
					<button type="submit">Join Room</button>
				</form>
			</div>
		);

	const quizRedirect = gameRedirectPath ? <Redirect to={gameRedirectPath} /> : null;

	return (
		<>
			{quizRedirect}
			<button onClick={joinRoomHandler}>Join Room</button>
			<button onClick={createRoomHandler}>Create Room</button>
			{loading ? Spinner : room}
		</>
	);
};

export default Lobby;
