import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Loader from "../../UI/Loader/Loader";
import FormModal from "../../UI/FormModal/FormModal";
import ModalButton from "../../UI/FormModal/Button/Button";

import { socket } from "../../../index";
import * as actions from "../../../store/actions/actions";
import styles from "../../UI/FormModal/FormModal.module.css";

const JoinRoom = props => {
	const [roomID, setRoomID] = useState("");
	const [error, setError] = useState(null);
	const [disableBtn, setDisableBtn] = useState(true);

	const topCard = useRef(null);

	const { startQuiz, history, showModal, closed } = props;

	useEffect(() => {
		socket.on("start_quiz_ack", ({ roomID, duration }) => {
			startQuiz(roomID, duration);
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
		socket.emit("join_room", roomID, response => {
			if (response.status === "Success") {
				props.setIsHost();
				setError(null);
				unstackCard();
			} else {
				setError(response.message);
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
		startQuiz: (roomID, duration) => dispatch(actions.startQuiz(roomID, duration)),
		setIsHost: () => dispatch(actions.setIsHost(false)),
	};
};

export default withRouter(connect(null, mapDispatchToProps)(JoinRoom));
