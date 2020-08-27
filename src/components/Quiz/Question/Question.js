import React, { useState, useEffect } from "react";
import { socket } from "../../../index";

const Question = props => {
	const [disableChoices, setDisableChoices] = useState(false);

	const { question, choices } = props;

	useEffect(() => {
		setDisableChoices(false);
	}, [question, choices]);

	const submitChoice = event => {
		const answer = event.target.textContent;
		socket.emit("submit_answer", answer);
		setDisableChoices(true);
	};

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
		</div>
	);
};

export default Question;
