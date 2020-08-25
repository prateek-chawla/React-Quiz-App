const Player = require('./player')
const Quiz = require('./quiz')

class QuizManager {
	constructor() {
		this.quizzes = {};
		this.players = {};
	}

	addQuiz(players, roomID, quizOptions, host) {
		const playerIDs = Object.keys(players);
		const playersList = {};

		playerIDs.map(
			playerID => (playersList[playerID] = new Player(roomID, playerID == host))
		);

		Object.assign(this.players, playersList);

		const quiz = new Quiz(playersList, roomID, quizOptions);
		this.quizzes[roomID] = quiz;
	}

	getQuiz(roomID) {
		if (roomID in this.quizzes) return this.quizzes[roomID];
		//Handler Error
		else return null;
	}

	getQuizByPlayer(player) {
		if (player in this.players) {
			const roomID = this.players[player].roomID;
			return this.getQuiz(roomID);
		}
		//Handle errors
		else return null;
	}
}

module.exports = QuizManager;