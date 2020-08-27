import * as actionTypes from "../actions/actionTypes";

const initialState = {
	playerID: null,
	roomID: null,
	opponentJoined: false,
	opponentLeft: null,
	score: { myScore: 0, opponentScore: 0 },
	isHost: true,
	quizInProgress: false,
	showResults: false,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_OPPONENT_JOINED:
			return {
				...state,
				opponentJoined: action.opponentJoined,
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
				showResults: true,
				quizInProgress: false,
			};
		case actionTypes.START_QUIZ:
			return {
				...state,
				roomID: action.roomID,
				quizInProgress: true,
			};
		case actionTypes.END_QUIZ:
			return {
				...state,
				showResults: true,
				quizInProgress: false,
			};
		case actionTypes.UPDATE_SCORE:
			return {
				...state,
				score: action.score,
			};
		case actionTypes.RESET_QUIZ:
			return initialState;
		default:
			return state;
	}
};

export default reducer;
