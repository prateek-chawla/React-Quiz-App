export const formatScore = (inputScore, playerID) => {
	const opponent = Object.keys(inputScore).filter(player => player !== playerID);

	const score = {
		myScore: score[playerID],
		opponentScore: score[opponent],
	};
	return score;
};

export const getResult = (score, playerID) => {
	const { myScore, opponentScore } = formatScore(score, playerID);
	let resultMsg;
	if (myScore > opponentScore) {
		resultMsg = "You win";
	} else if (myScore < opponentScore) {
		resultMsg = "You Lost";
	} else {
		resultMsg = "It's a Tie";
	}

	return { myScore, opponentScore, resultMsg };
};
