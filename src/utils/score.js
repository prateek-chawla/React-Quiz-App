export const formatScore = (inputScore, playerID) => {
	const opponent = Object.keys(inputScore).filter(player => player !== playerID);

	const score = {
		myScore: inputScore[playerID],
		opponentScore: inputScore[opponent],
	};
	return score;
};

export const getResult = score => {
	const { myScore, opponentScore } = score;
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

export const answerStatus = {
	UNANSWERED: 0,
	CORRECT: 1,
	INCORRECT: 2,
};
