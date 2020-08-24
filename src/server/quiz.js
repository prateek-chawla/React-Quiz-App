const axios = require("axios");
const {decodeHtml} = require('./utils')

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
		// console.log("url", url);
		// console.log("Promise");
		// return
		return axios.get(url);
	}

	getNextQuestion(player) {
		if (!this.currentQues) {
			// console.log("Fetching Questions")
			return this.fetchQuestions().then(response => {
				// console.log(response.data)
				this.questions = response.data.results;
				// console.log("Questions fetched");
				return this.getQuestion(player);
			});
		} else return this.getQuestion(player);
	}

	getScore(currPlayer) {
		let myScore, opponentScore;
		for (const player in this.players) {
			if (player === currPlayer)
				myScore = this.players[player].score
			else
				opponentScore= this.players[player].score
		}

		return {myScore,opponentScore}
	}

	getQuestion(player) {
		if (this.currentQuesIdx === this.nQuestions) {
			console.log("Quiz Finished");
			// const score = this.score[player];
			const {myScore,opponentScore} = getScore(player)
			return { status: "Questions_Finished", myScore,opponentScore };
			// Evaluate Results and send
		}

		const currentQues = this.questions[this.currentQuesIdx++];
		this.currentAnswer = decodeHtml(currentQues.correct_answer)
		const undecodedChoices = this.shuffleChoices([
			...currentQues.incorrect_answers,
			currentQues.correct_answer,
		]);
		const undecodedQuestion = currentQues.question;

		const question = decodeHtml(undecodedQuestion);
		const choices = undecodedChoices.map(choice => decodeHtml(choice));

		// const decodedQuestion = decodeURIComponent(questions)
		console.log(question);
		// console.log("Return value", question,choices)
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

	checkAnswer(player, answer) {
		if (this.answer === player) {
			console.log("Updating Score")
			this.players[player].score++;
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
		console.log(`${roomID} quiz added`);
		console.log("Quizzes", this.quizzes);
		console.log("Players", this.players);
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
	}
}

module.exports = QuizManager;
