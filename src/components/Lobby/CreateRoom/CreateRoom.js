import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { socket } from "../../../index";
import { generateRoomID } from "../../../utils/room";
import { joinClasses, copyToClipboard } from "../../../utils/general";

import Spinner from "../../UI/Spinner/Spinner";
import FormModal from "../../UI/FormModal/FormModal";
import ErrorModal from "../../UI/Error/Error";
import ModalButton from "../../UI/FormModal/Button/Button";

import * as actions from "../../../store/actions/actions";
import styles from "../../UI/FormModal/FormModal.module.css";

const CreateRoom = props => {
	const [roomID, setRoomID] = useState(null);
	const [category, setCategory] = useState("20");
	const [nQuestions, setNQuestions] = useState(5);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const topCard = useRef(null);

	const { setOpponentJoined, startQuiz, history, showModal, closed } = props;

	useEffect(() => {
		const generatedRoomID = generateRoomID();
		setRoomID(generatedRoomID);

		socket.on("player_joined", () => {
			setOpponentJoined(true);
			unstackCard();
		});

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
		unstackCard();
	};
	const updateNQuestions = event => {
		setNQuestions(event.target.value);
		setRoomID(generateRoomID());
		unstackCard();
	};

	const startQuizHandler = () => {
		const quizConfig = { roomID, category, nQuestions };
		socket.emit("start_quiz", quizConfig);
	};

	const unstackCard = () => {
		topCard.current.classList.add(styles.unstacked);
		topCard.current.classList.remove(styles.top);
		const nextCard = topCard.current.nextElementSibling;

		nextCard.classList.add(styles.top);
		nextCard.classList.remove(styles.stacked);
		topCard.current = nextCard;
	};

	const errorModal = error ? <ErrorModal message={error} /> : null;

	return (
		<FormModal title="Create Room" showModal={showModal} closed={closed}>
			<div ref={topCard} className={styles.top}>
				<div className={styles.message}>Pick A Category</div>
				<div onChange={updateCategory} className={styles.inputGroup}>
					<input type="radio" id="category-books" name="category" value="10" />
					<label htmlFor="category-books">Books</label>
					<input type="radio" id="category-sports" name="category" value="21" />
					<label htmlFor="category-sports">Sports</label>
					<input type="radio" id="category-movies" name="category" value="11" />
					<label htmlFor="category-movies">Movies</label>
					<input type="radio" id="category-comics" name="category" value="29" />
					<label htmlFor="category-comics">Comics</label>
				</div>
			</div>
			<div className={styles.stacked}>
				<div className={styles.message}>Select Number of Questions</div>
				<div onChange={updateNQuestions} className={styles.inputGroup}>
					<input type="radio" id="nQuestions-5" name="nQuestions" value="5" />
					<label htmlFor="nQuestions-5">5</label>
					<input type="radio" id="nQuestions-10" name="nQuestions" value="10" />
					<label htmlFor="nQuestions-10">10</label>
					<input type="radio" id="nQuestions-15" name="nQuestions" value="15" />
					<label htmlFor="nQuestions-15">15</label>
				</div>
			</div>
			<div className={joinClasses(styles.stacked, styles.roomCard)}>
				<div className={styles.message}>Share this Room ID </div>
				<div className={joinClasses(styles.inputGroup, styles.room)}>{roomID}</div>
				{document.queryCommandSupported("copy") && (
					<ModalButton clicked={() => copyToClipboard(roomID)} icon="copy">
						Copy
					</ModalButton>
				)}
			</div>
			<div
				onClick={startQuizHandler}
				className={joinClasses(styles.stacked, styles.successCard)}
			>
				<div className={styles.inputGroup}>Start Quiz</div>
			</div>
		</FormModal>
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateRoom));
