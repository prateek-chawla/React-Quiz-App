import * as actionTypes from "../actions/actionTypes";

const initialState = {
	playerID: null,
	roomID: null,
	opponentJoined: null,
	opponentLeft: null,
	score: null,
	isHost: true,
	quizInProgress: false,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.OPPONENT_JOINED:
			return {
				...state,
				opponentJoined: true,
				isHost: true,
			};
		case actionTypes.SET_ROOM_ID:
			return {
				...state,
				roomID: action.roomID,
			};
		case actionTypes.SET_IS_HOST:
			return {
				...state,
				isHost: action.isHost,
			};
		case actionTypes.OPPONENT_LEFT:
			return {
				...state,
				opponentLeft: true,
				quizInProgress: false,
			};
		case actionTypes.START_QUIZ:
			return {
				...state,
				roomID: action.roomID,
				quizInProgress: true,
			};
		case actionTypes.UPDATE_SCORE:
			return {
				...state,
				score: action.score,
			};
		default:
			return state;
	}
};

export default reducer;
