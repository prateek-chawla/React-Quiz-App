import React, { useState, useEffect } from "react";
import { socket } from "../../../index";
const Question = props => {

	const [myScore, setMyScore] = useState(0)
	const [opponentScore, setOpponentScore] = useState(0);

	useEffect(() => {
		socket.on('update_score', score => {
			setMyScore(score.myScore)
			setMyScore(score.opponentScore)
		})

	}, [])

	const submitChoice = event => {
		console.log(event.target.textContent);
		// console.log(event);
		const answer = event.target.textContent
		socket.emit('submit_anwer',answer)
	};

	return (
		<div>
			{props.question}
			{props.choices &&
				props.choices.map(choice => (
					<div key={choice} onClick={submitChoice}>
						{choice}
					</div>
				))}

			<div>My Score {myScore}</div>
			<div>Opponent Score {opponentScore}</div>
		</div>
	);
};

export default Question;
