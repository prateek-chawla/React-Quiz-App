import React from "react";

import { getResult } from "../../../utils/score";

const FinalResult = props => {
	const { myScore, opponentScore, resultMsg } = getResult(
		props.score,
		props.playerID
	);

	return (
		<div>
			<div> Your Score {myScore}</div>
			<div> Opponent Score {opponentScore}</div>
			<div>{resultMsg}</div>
		</div>
	);
};

export default FinalResult;
