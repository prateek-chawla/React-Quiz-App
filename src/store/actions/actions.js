import * as actionTypes from "./actionTypes";

export const setOpponentJoined = opponentJoined => {
	return {
		type: actionTypes.SET_OPPONENT_JOINED,
		opponentJoined,
	};
};

export const setOpponentLeft = () => {
	return { type: actionTypes.OPPONENT_LEFT };
};

export const setRoomID = roomID => {
	return { type: actionTypes.SET_ROOM_ID, roomID };
};

export const setIsHost = isHost => {
	return { type: actionTypes.SET_IS_HOST, isHost };
};

export const updateScore = score => {
	return { type: actionTypes.UPDATE_SCORE, score };
};

export const startQuiz = roomID => {
	return { type: actionTypes.START_QUIZ, roomID };
};

export const endQuiz = () => {
	return { type: actionTypes.END_QUIZ };
};

export const resetQuiz = () => {
	return { type: actionTypes.RESET_QUIZ };
};
