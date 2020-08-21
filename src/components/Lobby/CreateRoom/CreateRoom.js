import React from "react";

const CreateRoom = props => {
	return (
        <div>
			<div>Room id {props.roomID}</div>
			<div>opponent joined : {props.opponentJoined.toString()}</div>
			<button disabled={!props.opponentJoined}>Start Game</button>
		</div>
	);
};

export default CreateRoom;
