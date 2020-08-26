import React from "react";
import { connect } from "react-redux";

import { getResult } from "../../utils/score";

const Result = props => {
	const { score, playerID, opponentLeft } = props;
	let { myScore, opponentScore, resultMsg } = getResult(score, playerID);

	if (opponentLeft) {
		resultMsg = "OpponentLeft";
	}

	return (
		<div>
			<div> Your Score {myScore}</div>
			<div> Opponent Score {opponentScore}</div>
			<div>{resultMsg}</div>
		</div>
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
