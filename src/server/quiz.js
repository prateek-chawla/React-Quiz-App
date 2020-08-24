const axios = require("axios");
const { decodeHtml } = require("./utils");

class Quiz {
	constructor(players, roomID, quizOptions) {
		this.room = roomID;
		this.nQuestions = quizOptions.nQuestions || 5;
		this.difficulty = quizOptions.difficulty || "medium";
		this.category = quizOptions.category || 20;
		this.questions = null;
		this.currentQuesIdx = 0;
		this.currentAnswer = null;
		this.players = players;
		// this.players = {
		// 	...Object.keys(players).map(player => new Player(roomID, player == host)),
		// };
		// this.score = {
		// 	...Object.keys(players).map(player => ({ player: 0 })),
		// };
	}

	fetchQuestions() {
		const url = `https://opentdb.com/api.php?amount=${this.nQuestions}&category=${this.category}&difficulty=${this.difficulty}&type=multiple`;

		return axios.get(url);
	}

	async getNextQuestion(player) {
		if (!this.currentAnswer) {
			console.log("Fetching Questions");

			const response = await this.fetchQuestions();
			const questions = response.data.results;
			this.questions = questions;
			// return this.fetchQuestions()
			// 	.then(response => {
			// 		// console.log(response.data)
			// 		this.questions = response.data.results;
			// 		// console.log("Questions fetched");
			// 		return this.getQuestion(player);
			// 	})
			// 	.catch(err => console.log("ERROR", err));
		}
		return this.getQuestion(player);
	}

	getScore() {
		// let myScore, opponentScore;
		// myScore = this.players[currPlayer].score;

		// const opponent = Object.keys(this.players).filter(
		// 	player => player !== currPlayer
		// );
		// opponentScore = this.players[opponent[0]].score;

		// Object.keys(this.players).map(player=>)
		const score = {};
		// const players=Object.keys(this.players)
		for (const player in this.players) {
			score[player] = this.players[player].score;
		}
		return score;
	}

	getQuestion(player) {
		if (this.currentQuesIdx === this.nQuestions) {
			// console.log("Quiz Finished");
			// // const score = this.score[player];
			// console.log(typeof player,player.id,this.players)
			const score = this.getScore();
			// console.log("Final Score", score);
			// const obj = { status: "Questions_Finished", score };
			// console.log(obj);
			return { status: "Questions_Finished", score };
			// Evaluate Results and send
		}
		// console.log("Getting Question");

		const currentQues = this.questions[this.currentQuesIdx++];
		this.currentAnswer = decodeHtml(currentQues.correct_answer);
		const undecodedChoices = this.shuffleChoices([
			...currentQues.incorrect_answers,
			currentQues.correct_answer,
		]);
		const undecodedQuestion = currentQues.question;

		const question = decodeHtml(undecodedQuestion);
		const choices = undecodedChoices.map(choice => decodeHtml(choice));
		this.resetPlayersTime(this.players);
		return { status: "Success", question, choices };
	}
	shuffleChoices(choices) {
		let currentIndex = choices.length,
			temporaryValue,
			randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = choices[currentIndex];
			choices[currentIndex] = choices[randomIndex];
			choices[randomIndex] = temporaryValue;
		}

		return choices;
	}

	resetPlayersTime(players) {
		const currrentTime = new Date().getTime();
		for (const player in players) {
			players[player].time = currrentTime;
		}
	}

	checkAnswer(player, answer) {
		// console.log(this.currentAnswer, answer);
		if (this.currentAnswer === answer) {
			// console.log("Updating Score");
			const currentTime = new Date().getTime();
			const duration = 3000; //milliseconds
			const scoreIncrement =
				parseInt((1 - (currentTime - this.players[player].time) / duration) * 100)
			console.log(scoreIncrement)
			this.players[player].score += scoreIncrement;
		}
	}
}

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
		// for (const playerID of playerIDs) {
		// 	this.players[playerID] = new Player(roomID, player == host)
		// 	playersList[playerID] = this.players[playerID]
		// }

		Object.assign(this.players, playersList);

		const quiz = new Quiz(playersList, roomID, quizOptions);
		this.quizzes[roomID] = quiz;
		// const players = {
		// 	...Object.keys(players).map(player => new Player(roomID, player == host)),
		// };
		// console.log(`${roomID} quiz added`);
		// console.log("Quizzes", this.quizzes);
		// console.log("Players", this.players);
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

class Player {
	constructor(roomID, isHost) {
		this.score = 0;
		this.roomID = roomID;
		this.isHost = isHost;
		this.time = null;
	}
}

module.exports = QuizManager;
