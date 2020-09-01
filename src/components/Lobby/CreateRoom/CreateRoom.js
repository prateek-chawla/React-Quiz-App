import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { socket } from "../../../index";
import { generateRoomID } from "../../../utils/room";

import Spinner from "../../UI/Spinner/Spinner";
import Modal from "../../UI/Modal/Modal";
import ErrorModal from "../../UI/Error/Error";

import * as actions from "../../../store/actions/actions";

const CreateRoom = props => {
	const [roomID, setRoomID] = useState(null);
	const [category, setCategory] = useState("20");
	const [difficulty, setDifficulty] = useState("medium");
	const [nQuestions, setNQuestions] = useState(5);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const { setOpponentJoined, startQuiz, history } = props;

	useEffect(() => {
		const generatedRoomID = generateRoomID();
		setRoomID(generatedRoomID);

		socket.on("player_joined", () => setOpponentJoined(true));

		socket.on("opponent_left", () => setOpponentJoined(false));

		socket.on("start_quiz_ack", room => {
			startQuiz(room);
			history.push(`/quiz`);
		});

		return () => {
			socket.off("start_quiz_ack");
			socket.off("player_joined");
			socket.off("opponent_left");
		};
		//eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (roomID)
			socket.emit("create_room", roomID, response => {
				if (response.status === "Success") {
					setLoading(false);
					setError(null);
				} else {
					setError(response.message);
					setLoading(false);
				}
			});
	}, [roomID]);

	const updateCategory = event => {
		setCategory(event.target.value);
	};
	const updateNQuestions = event => {
		setNQuestions(event.target.value);
	};
	const updateDifficulty = event => {
		setDifficulty(event.target.value);
	};

	const startQuizHandler = () => {
		const quizConfig = { roomID, category, difficulty, nQuestions };
		socket.emit("start_quiz", quizConfig);
	};

	const errorModal = error ? <ErrorModal message={error} /> : null;
	return (
		<Modal closed={props.closed} showModal={props.showModal}>
			{errorModal}
			{loading ? (
				<Spinner />
			) : (
				<div>
					<div>Room id {roomID}</div>
					<div>opponent joined : {props.opponentJoined.toString()}</div>

					<label>
						Select Category:
						<select value={category} onChange={updateCategory}>
							<option value="10">Books</option>
							<option value="21">Sports</option>
							<option value="11">Movies</option>
							<option value="29">Comics</option>
						</select>
					</label>
					<label>
						Select Number Of Questions:
						<select value={nQuestions} onChange={updateNQuestions}>
							<option value="5">5</option>
							<option value="10">10</option>
							<option value="15">15</option>
						</select>
					</label>
					<label>
						Select Difficulty Level:
						<select value={difficulty} onChange={updateDifficulty}>
							<option value="easy">Easy</option>
							<option value="medium">Medium</option>
							<option value="hard">Hard</option>
						</select>
					</label>
					<button disabled={!props.opponentJoined} onClick={startQuizHandler}>
						Start Quiz
					</button>
				</div>
			)}
		</Modal>
	);
};

const mapStateToProps = state => {
	return {
		opponentJoined: state.opponentJoined,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		startQuiz: roomID => dispatch(actions.startQuiz(roomID)),
		setOpponentJoined: opponentJoined => dispatch(actions.setOpponentJoined(opponentJoined)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateRoom);
