import React from "react";
import { connect } from "react-redux";

import Modal from "../UI/Modal/Modal";
import { getResult } from "../../utils/score";
import goldTrophy from "../../assets/images/trophyGold.png";
import silverTrophy from "../../assets/images/trophySilver.png";

import styles from "./Result.module.css";

const Result = props => {
	const { score, opponentLeft, showResults, closed } = props;
	let { myScore, opponentScore, resultMsg } = getResult(score);

	const resultIcon = myScore < opponentScore ? silverTrophy : goldTrophy;

	if (opponentLeft) resultMsg = "Opponent Left";

	return (
		<Modal showModal={showResults} closed={closed}>
			<div className={styles.semicircle} />
			<div className={styles.trophyContainer}>
				<img src={resultIcon} alt="Trophy" />
			</div>
			<div className={styles.scoreContainer}>
				<div className={styles.scoreMsg}>{resultMsg}</div>
				<div className={styles.title}>Score</div>
				<div className={styles.score}>
					<div className={styles.myScore}>
						<span>{myScore}</span>
					</div>
					<div className={styles.separator} />
					<div className={styles.opponentScore}>
						<span>{opponentScore}</span>
					</div>
				</div>
			</div>
			<div className={styles.playAgain} onClick={closed}>
				<span>Play Again</span>
			</div>
		</Modal>
	);
};

const mapStateToProps = state => {
	return {
		score: state.score,
		playerID: state.playerID,
		opponentLeft: state.opponentLeft,
	};
};
export default connect(mapStateToProps)(Result);
