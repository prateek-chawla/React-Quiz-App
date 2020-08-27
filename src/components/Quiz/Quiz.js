import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { socket } from "../../index";
import Question from "./Question/Question";

import { formatScore } from "../../utils/score";
import * as actions from "../../store/actions/actions";

const Quiz = props => {
	const [loading, setLoading] = useState(true);
	const [question, setQuestion] = useState(null);
	const [choices, setChoices] = useState(null);
	const [homeRedirect, setHomeRedirect] = useState(false);

	const playerID = socket.id;

	const fetchQuestionInterval = useRef(null);
	const {
		quizInProgress,
		score,
		setOpponentLeft,
		endQuiz,
		updateScore,
		history,
	} = props;

	useEffect(() => {

		if (!quizInProgress) setHomeRedirect(true);

		fetchQuestionInterval.current = setInterval(getNextQuestion, 3000);

		socket.on("next_question", response => {
			if (response.status === "Success") {
				setQuestion(response.question);
				setChoices(response.choices);
				setLoading(false);
			} else if (response.status === "Questions_Finished") {
				setLoading(false);
				clearInterval(fetchQuestionInterval.current);
				endQuiz();
				history.push("/result");
			} else {
				console.log("ERROR");
			}
		});

		socket.on("opponent_left", finalScore => {
			const score = formatScore(finalScore, playerID);
			updateScore(score);
			setOpponentLeft();
			endQuiz();
			history.push("/result");
		});

		socket.on("update_score", responseScore => {
			const score = formatScore(responseScore, playerID);
			updateScore(score);
		});
		return () => {
			socket.off("opponent_left");
			socket.off("next_question");
			socket.off("update_score");
			clearInterval(fetchQuestionInterval.current);
		};
		//eslint-disable-next-line
	}, []);

	const getNextQuestion = () => {
		socket.emit("get_next_question");
	};

	return (
		<>
			{homeRedirect && <Redirect to="/" />}
			<div>
				<div>Quiz</div>
				{loading ? "Loading...." : null}
				<Question question={question} choices={choices} />
			</div>
			<div>My Score {score.myScore}</div>
			<div>Opponent Score {score.opponentScore}</div>
		</>
	);
};

const mapStateToProps = state => {
	return {
		quizInProgress: state.quizInProgress,
		score: state.score,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		updateScore: score => dispatch(actions.updateScore(score)),
		setOpponentLeft: () => dispatch(actions.setOpponentLeft()),
		endQuiz: () => dispatch(actions.endQuiz()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
