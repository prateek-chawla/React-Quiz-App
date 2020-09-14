export const answerStatus = {
	UNANSWERED: 0,
	CORRECT: 1,
	INCORRECT: 2,
};

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

export const changeScoreWidth = (score, quesNumber) => {
	let myScoreWidth = "0%",
		opponentScoreWidth = "0%";

	if (score.myScore + score.opponentScore > 0) {
		const maxScore = Math.max(score.myScore, score.opponentScore);
		const scalingFactor = (quesNumber * 100) / maxScore;
		const adjustedScalingFactor = scalingFactor > 1 ? Math.floor(scalingFactor) : 1;
		myScoreWidth = parseInt((adjustedScalingFactor * score.myScore) / quesNumber) + "%";
		opponentScoreWidth =
			parseInt((adjustedScalingFactor * score.opponentScore) / quesNumber) + "%";
	}

	return { myScoreWidth, opponentScoreWidth };
};
