import React, { useEffect, useState, useRef } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { socket } from "../../index";

import Spinner from "../UI/Spinner/Spinner";
import Question from "./Question/Question";

import { formatScore, answerStatus, changeScoreWidth } from "../../utils/score";
import * as actions from "../../store/actions/actions";
import styles from "./Quiz.module.css";

const Quiz = props => {
	const [loading, setLoading] = useState(true);
	const [question, setQuestion] = useState(null);
	const [choices, setChoices] = useState(null);
	const [homeRedirect, setHomeRedirect] = useState(false);
	const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

	const fetchMoreQuestionsTimeout = useRef(null);
	const timerRef = useRef(null);
	const quesNumberRef = useRef(0);
	const myScoreRef = useRef(null);
	const opponentScoreRef = useRef(null);

	const playerID = socket.id;
	const { appear, appearActive, enter, enterActive, exit, exitActive } = styles;
	const {
		quizInProgress,
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
				quesNumberRef.current++;
				setQuestion(response.question);
				setIsAnswerCorrect(answerStatus.UNANSWERED);
				setChoices(response.choices);
				setLoading(false);
			} else if (response.status === "Questions_Finished") {
				setQuestion(null);
				endQuiz();
				history.push("/result");
			} else {
				console.log("ERROR");
			}
		});

		socket.on("opponent_left", () => {
			setOpponentLeft();
			endQuiz();
			history.push("/result");
		});

		socket.on("update_score", ({ score, player, isCorrect }) => {
			const formattedScore = formatScore(score, playerID);
			changeScore(formattedScore, player, isCorrect);
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
		if (isHost && question)
			fetchMoreQuestionsTimeout.current = setTimeout(getNextQuestion, duration);

		return () => clearTimeout(fetchMoreQuestionsTimeout.current);
	}, [question, isHost, duration]);

	const animateTimer = () => {
		if (timerRef.current) {
			timerRef.current.classList.remove(styles.animateTimer);
			//Force Reflow
			void timerRef.current.offsetWidth;
			timerRef.current.classList.add(styles.animateTimer);
			const animationDelay = 500;
			timerRef.current.style.animationDuration = duration - animationDelay + "ms";
		}
	};

	const getNextQuestion = () => {
		socket.emit("get_next_question");
	};

	const changeScore = (score, player, isCorrect) => {
		if (player && player === playerID) {
			if (isCorrect) setIsAnswerCorrect(answerStatus.CORRECT);
			else setIsAnswerCorrect(answerStatus.INCORRECT);
		}

		if (myScoreRef.current && opponentScoreRef.current) {
			const { myScoreWidth, opponentScoreWidth } = changeScoreWidth(
				score,
				quesNumberRef.current
			);

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
				<div className={styles.quiz}>
					<div className={styles.timer}>
						<div ref={timerRef} className={styles.timerInner} />
					</div>

					{/* prettier-ignore */}
					<TransitionGroup>
						<CSSTransition timeout={{enter: 500,exit: 250,}} key={quesNumberRef.current} appear
							classNames={{appear,appearActive,enter,enterActive,exit,exitActive,}}
							onEntered={animateTimer}
						>
							<Question
									question={question} choices={choices} isAnswerCorrect={isAnswerCorrect}
									questionNumber={quesNumberRef.current}
							/>
						</CSSTransition>
					</TransitionGroup>

					<div className={styles.scoreContainer}>
						<div ref={myScoreRef} className={styles.myScore} />
						<div ref={opponentScoreRef} className={styles.opponentScore} />
					</div>
				</div>
			)}
		</>
	);
};

const mapStateToProps = state => {
	return {
		quizInProgress: state.quizInProgress,
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
