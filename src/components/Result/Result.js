import React from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";

import { getResult } from "../../utils/score";

const Result = props => {
	const { score, opponentLeft, showResults } = props;
	let { myScore, opponentScore, resultMsg } = getResult(score);

	if (opponentLeft) {
		resultMsg = "OpponentLeft";
	}
	const homeRedirect = showResults ? null : <Redirect to="/" />;

	return (
		<>
			{homeRedirect}
			<Link to="/">Play Again</Link>
			<div>
				<div> Your Score {myScore}</div>
				<div> Opponent Score {opponentScore}</div>
				<div>{resultMsg}</div>
			</div>
		</>
	);
};

const mapStateToProps = state => {
	return {
		score: state.score,
		playerID: state.playerID,
		opponentLeft: state.opponentLeft,
		showResults: state.showResults,
	};
};
export default connect(mapStateToProps)(Result);
