import React, { useState, useEffect } from "react";
import { socket } from "../../../index";

import { formatScore } from "../../../utils/score";

const Question = props => {
	const [myScore, setMyScore] = useState(0);
	const [opponentScore, setOpponentScore] = useState(0);
	const [disableChoices, setDisableChoices] = useState(false);
	// const [playerID,setPlayerID] = useState(socket.id)

	const playerID = socket.id;
	const { question, choices } = props;

	useEffect(() => {
		socket.on("update_score", responseScore => {
			const score = formatScore(responseScore,playerID);
			setMyScore(score.myScore);
			setOpponentScore(score.opponentScore);
		});
	}, []);

	useEffect(() => {
		setDisableChoices(false);
	}, [question, choices]);

	const submitChoice = event => {
		console.log(event.target.textContent);
		// console.log(event);
		const answer = event.target.textContent;
		socket.emit("submit_answer", answer);
		setDisableChoices(true);
	};

	// const updateScore = () => {
	// 	socket.emit("get_score", null, response => {
	// 		if (response.status === "Success") {
	// 			setMyScore(score.myScore);
	// 			setOpponentScore(score.opponentScore);
	// 		} else {
	// 			console.log("Error Setting Score")
	// 		}
	// 	});
	// };

	return (
		<div>
			{question}
			{choices &&
				choices.map(choice => (
					<button key={choice} onClick={submitChoice} disabled={disableChoices}>
						{choice}
					</button>
					// <div key={choice} onClick={submitChoice} disabled={disableChoices}>
					// 	{choice}
					// </div>
				))}

			<div>My Score {myScore}</div>
			<div>Opponent Score {opponentScore}</div>
		</div>
	);
};

export default Question;
