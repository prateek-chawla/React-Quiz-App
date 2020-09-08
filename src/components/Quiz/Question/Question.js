import React, { useState, useEffect } from "react";
import { socket } from "../../../index";

import styles from "./Question.module.css";

const Question = props => {
	const [disableChoices, setDisableChoices] = useState(false);

	const { question, choices, questionNumber } = props;

	useEffect(() => {
		setDisableChoices(false);
	}, [question, choices]);

	const submitChoice = event => {
		const answer = event.target.textContent;
		socket.emit("submit_answer", answer);
		console.log("Submitting answer ",answer)
		setDisableChoices(true);
	};

	return (
		<div className={styles.quesContainer}>
			<div className={styles.left}>
				<span className={styles.quesNumber}>
					{questionNumber < 10 ? "0" + questionNumber : questionNumber}
				</span>
				<div className={styles.question}>
					<div>{question}</div>
				</div>
			</div>
			<div className={styles.choices}>
				{choices &&
					choices.map(choice => (
						<div
							key={choice}
							className={styles.choice}
							onClick={submitChoice}
							disabled={disableChoices}
						>
							{choice}
						</div>
					))}
			</div>
		</div>
	);
};

export default Question;
