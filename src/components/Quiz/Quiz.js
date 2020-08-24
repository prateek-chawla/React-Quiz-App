import React, { useEffect, useState, useRef } from "react";
import { socket } from "../../index";
import Question from "./Question/Question";
// import { response } from "express";

const Quiz = props => {
	const [loading, setLoading] = useState(true);
	const [question, setQuestion] = useState(null);
	const [choices, setChoices] = useState(null);

	const fetchQuestionInterval = useRef(null);

	useEffect(() => {
		console.log("CMD QUIZ");

		socket.on("next_question", response => {
			console.log("response", response);
			if (response.status === "Success") {
				setQuestion(response.question);
				setChoices(response.choices);
				setLoading(false);
			} else if (response.status === "Questions_Finished") {
                setLoading(false);
                console.log("Clearing Interval - Questions Finished")
				clearInterval(fetchQuestionInterval.current);
				console.log(response.score);
			} else {
				console.log("ERROR");
			}
		});
		// if (isHost) {
		fetchQuestionInterval.current = setInterval(getNextQuestion, 3000);

		return () => {
			console.log("Cleared Interval on Unmount");
			clearInterval(fetchQuestionInterval.current);
		};
		// }
	}, []);

	const getNextQuestion = () => {
		console.log("Getting Next Question");
		socket.emit("get_next_question");
	};

	return (
		<div>
			<div>Quiz</div>
			{loading ? "Loading...." : null}
			{console.log(question)}
			<Question question={question} choices={choices} />
		</div>
	);
};

export default Quiz;
