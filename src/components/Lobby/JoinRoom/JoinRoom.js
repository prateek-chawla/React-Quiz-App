import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Modal from "../../UI/Modal/Modal";
import Spinner from "../../UI/Spinner/Spinner";
import Loader from "../../UI/Loader/Loader";
import Button from "../../UI/Button/Button";
import FormModal from "../../UI/FormModal/FormModal";
import ModalButton from "../../UI/FormModal/Button/Button";

import { socket } from "../../../index";
import { joinClasses } from "../../../utils/general";
import * as actions from "../../../store/actions/actions";
import styles from "../../UI/FormModal/FormModal.module.css";

const JoinRoom = props => {
	const [roomID, setRoomID] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [disableBtn, setDisableBtn] = useState(true);

	const topCard = useRef(null);

	const { startQuiz, history, showModal, closed } = props;

	useEffect(() => {
		socket.on("start_quiz_ack", room => {
			startQuiz(room);
			history.push(`/quiz`);
		});

		return () => {
			socket.off("start_quiz_ack");
		};
		//eslint-disable-next-line
	}, []);

	const changeRoomID = event => {
		const room = event.target.value;
		setDisableBtn(room.length < 6);
		setRoomID(room);
		setError(null);
	};

	const submitJoinRoomHandler = event => {
		event.preventDefault();
		// setLoading(true);
		socket.emit("join_room", roomID, response => {
			if (response.status === "Success") {
				props.setIsHost();
				setLoading(false);
				setError(null);
				unstackCard();
			} else {
				setError(response.message);
				setLoading(false);
			}
		});
	};

	const unstackCard = () => {
		topCard.current.classList.add(styles.unstacked);
		topCard.current.classList.remove(styles.top);
		const nextCard = topCard.current.nextElementSibling;

		nextCard.classList.add(styles.top);
		nextCard.classList.remove(styles.stacked);
		topCard.current = nextCard;
	};

	// let joinRoomForm = (
	// 	<form onSubmit={submitJoinRoomHandler}>
	// 		<input type="text" onChange={changeRoomID} value={roomID} required />
	// 		<Button type="submit" clicked={submitJoinRoomHandler}>
	// 			Join Room
	// 		</Button>
	// 	</form>
	// );

	return (
		<FormModal
			title="Join Room"
			showModal={showModal}
			closed={closed}
			error={error}
			cleanup={() => setError(null)}
		>
			<div ref={topCard} className={styles.top}>
				<div className={styles.message}>Enter Room ID</div>
				{/* <div className={joinClasses(styles.inputGroup,styles.joinCard)}> */}
				<div className={styles.joinCard}>
					<input type="text" onChange={changeRoomID} value={roomID} />
					<ModalButton disabled={disableBtn} clicked={submitJoinRoomHandler} icon="check">
						Join
					</ModalButton>
				</div>
			</div>
			<div className={styles.stacked}>
				<div className={styles.message}>Waiting for host to Start Quiz</div>
				<Loader />
			</div>
		</FormModal>
	);
};

const mapDispatchToProps = dispatch => {
	return {
		startQuiz: roomID => dispatch(actions.startQuiz(roomID)),
		setIsHost: () => dispatch(actions.setIsHost(false)),
	};
};

export default withRouter(connect(null, mapDispatchToProps)(JoinRoom));
