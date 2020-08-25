import React from "react";

import { getResult } from "../../utils/score";

const Result = props => {
	let { myScore, opponentScore, resultMsg } = getResult(
		props.score,
		props.playerID
    );

    if (props.opponentLeft) {
        resultMsg='OpponentLeft'
    }

	return (
		<div>
			<div> Your Score {myScore}</div>
			<div> Opponent Score {opponentScore}</div>
			<div>{resultMsg}</div>
		</div>
	);
};

export default Result;
