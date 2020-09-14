import React, { useState, useEffect, useRef } from "react";
import { socket } from "../../../index";
import { joinClasses } from "../../../utils/general";
import { answerStatus } from "../../../utils/score";
import styles from "./Question.module.css";

const Question = props => {
	const [disableChoices, setDisableChoices] = useState(false);
	const submittedAnsRef = useRef(null);
	const { question, choices, questionNumber, isAnswerCorrect } = props;

	useEffect(() => {
		if (submittedAnsRef.current) {
			if (isAnswerCorrect === answerStatus.CORRECT)
				submittedAnsRef.current.classList.add(styles.flashGreen);
			else if (isAnswerCorrect === answerStatus.INCORRECT)
				submittedAnsRef.current.classList.add(styles.flashRed);
		}
	}, [isAnswerCorrect]);

	const submitChoice = event => {
		if (disableChoices) return;
		const answer = event.target.textContent;
		socket.emit("submit_answer", answer);
		submittedAnsRef.current = event.target;
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
							className={joinClasses(
								styles.choice,
								disableChoices ? styles.disableChoices : ""
							)}
							onClick={submitChoice}
						>
							{choice}
						</div>
					))}
			</div>
		</div>
	);
};

export default Question;
