import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { socket } from "../../index";

import Spinner from "../UI/Spinner/Spinner";
import Question from "./Question/Question";

import { formatScore } from "../../utils/score";
import * as actions from "../../store/actions/actions";
import styles from "./Quiz.module.css";

const Quiz = props => {
	const [loading, setLoading] = useState(true);
	const [question, setQuestion] = useState(null);
	const [choices, setChoices] = useState(null);
	const [homeRedirect, setHomeRedirect] = useState(false);

	const playerID = socket.id;

	const fetchMoreQuestionsTimeout = useRef(null);
	const timerRef = useRef(null);
	const myScoreRef = useRef(null);
	const quesNumberRef = useRef(0);
	const opponentScoreRef = useRef(null);

	const {
		quizInProgress,
		score,
		setOpponentLeft,
		endQuiz,
		updateScore,
		isHost,
		duration,
		history,
	} = props;

	useEffect(() => {
		if (!quizInProgress) setHomeRedirect(true);

		if (isHost) getNextQuestion();

		socket.on("next_question", response => {
			if (response.status === "Success") {
				setLoading(false);
				setQuestion(response.question);
				quesNumberRef.current++;
				setChoices(response.choices);
			} else if (response.status === "Questions_Finished") {
				setLoading(false);
				setQuestion(null);
				endQuiz();
				history.push("/result");
			} else {
				console.log("ERROR");
			}
		});

		socket.on("opponent_left", finalScore => {
			const score = formatScore(finalScore, playerID);
			changeScore(score);
			setOpponentLeft();
			endQuiz();
			history.push("/result");
		});

		socket.on("update_score", responseScore => {
			const score = formatScore(responseScore, playerID);
			changeScore(score);
		});
		return () => {
			socket.off("opponent_left");
			socket.off("next_question");
			socket.off("update_score");
			clearTimeout(fetchMoreQuestionsTimeout.current);
		};
		//eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (isHost && question) {
			fetchMoreQuestionsTimeout.current = setTimeout(getNextQuestion, duration);
		}
		if (timerRef.current) {
			timerRef.current.classList.remove(styles.animateTimer);
			void timerRef.current.offsetWidth;
			timerRef.current.classList.add(styles.animateTimer);
			timerRef.current.style.animationDuration = `${duration}ms`;
		}

		return () => clearTimeout(fetchMoreQuestionsTimeout.current);
	}, [question]);

	const getNextQuestion = () => {
		socket.emit("get_next_question");
	};

	const changeScore = score => {
		if (myScoreRef.current && opponentScoreRef.current) {
			let myScoreWidth = "5%",
				opponentScoreWidth = "5%";

			if (score.myScore + score.opponentScore > 0) {
				const maxScore = Math.max(score.myScore, score.opponentScore);
				const scalingFactor = (quesNumberRef.current * 100) / maxScore;
				const adjustedScalingFactor = scalingFactor > 2 ? Math.floor(scalingFactor) - 1 : 1;
				myScoreWidth =
					Math.max(
						5,
						parseInt((adjustedScalingFactor * score.myScore) / quesNumberRef.current)
					) + "%";
				opponentScoreWidth =
					Math.max(
						5,
						parseInt(
							(adjustedScalingFactor * score.opponentScore) / quesNumberRef.current
						)
					) + "%";
			}
			myScoreRef.current.style.width = myScoreWidth;
			opponentScoreRef.current.style.width = opponentScoreWidth;
		}
		updateScore(score);
	};

	return (
		<>
			{homeRedirect && <Redirect to="/" />}
			{loading ? (
				<Spinner />
			) : (
				<>
					<div className={styles.timer}>
						<div ref={timerRef} className={styles.timerInner} />
					</div>
					<Question
						question={question}
						choices={choices}
						questionNumber={quesNumberRef.current}
					/>
					<div className={styles.scoreContainer}>
						<div ref={myScoreRef} className={styles.myScore} />
						<div ref={opponentScoreRef} className={styles.opponentScore} />
					</div>
				</>
			)}
		</>
	);
};

const mapStateToProps = state => {
	return {
		quizInProgress: state.quizInProgress,
		score: state.score,
		isHost: state.isHost,
		duration: state.duration,
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
