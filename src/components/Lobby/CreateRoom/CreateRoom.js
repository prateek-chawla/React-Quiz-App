import React, { useState } from "react";
import { socket } from "../../../index";

const CreateRoom = props => {
	const [category, setCategory] = useState("20");
	const [difficulty, setDifficulty] = useState("medium");
	const [nQuestions, setNQuestions] = useState(5);

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
		const quizConfig = {
			roomID: props.roomID,
			category,
			difficulty,
			nQuestions,
		};
		socket.emit("start_game", quizConfig);
	};
	return (
		<div>
			<div>Room id {props.roomID}</div>
			<div>opponent joined : {props.opponentJoined.toString()}</div>

			<label>
				Select Category:
				<select value={category} onChange={updateCategory}>
					<option value="20">Mythology</option>
					<option value="21">Sports</option>
					<option value="11">Movies</option>
					<option value="9">General Knowledge</option>
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
	);
};

export default CreateRoom;
