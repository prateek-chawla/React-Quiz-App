const axios = require("axios");
const { decodeHtml, shuffleChoices } = require("../utils");

class Quiz {
	constructor(players, roomID, quizOptions) {
		this.room = roomID;

		// Default Options
		this.nQuestions = +quizOptions.nQuestions || 5;
		this.category = quizOptions.category || 10; // Default - Books
		// this.difficulty = quizOptions.difficulty || "medium";

		this.questions = null;
		this.currentQuesIdx = 0;
		this.currentAnswer = null;
		this.players = players;
	}

	fetchQuestions() {
		const baseUrl = "https://opentdb.com/api.php?difficulty=medium&type=multiple&";
		const url = `${baseUrl}amount=${this.nQuestions}&category=${this.category}`;
		return axios.get(url);
	}

	async getNextQuestion(player) {
		// If questions havent been fetched yet
		if (!this.currentAnswer) {
			const response = await this.fetchQuestions();
			const questions = response.data.results;
			this.questions = questions;
		}
		return this.getQuestion(player);
	}

	getScore() {
		// Map Score from Players object
		const score = {};
		for (const player in this.players) {
			score[player] = this.players[player].score;
		}
		return score;
	}

	getQuestion(player) {
		if (this.currentQuesIdx === this.nQuestions) {
			// Quiz Finished - Return Final Score
			const score = this.getScore();
			return { status: "Questions_Finished", score };
		}

		const currentQues = this.questions[this.currentQuesIdx++];

		// Set next Question and Answer
		this.currentAnswer = decodeHtml(currentQues.correct_answer);
		const choices = shuffleChoices([
			...currentQues.incorrect_answers,
			currentQues.correct_answer,
		]);

		const question = decodeHtml(currentQues.question);
		this.resetPlayersTime();
		return { status: "Success", question, choices };
	}

	resetPlayersTime() {
		// Reset Time after Fetching next Question
		const currrentTime = new Date().getTime();
		for (const player in this.players) {
			this.players[player].time = currrentTime;
		}
	}

	checkAnswer(player, answer) {
		if (this.currentAnswer === answer) {
			// Update Score
			const currentTime = new Date().getTime();
			const duration = 3000; //milliseconds

			const baseScore = 40; // atleast 40 points for a correct answer
			const speedScore = parseInt(
				(1 - (currentTime - this.players[player].time) / duration) * 60
			); // 60 variable points based on how fast the question was answered

			const scoreIncrement = baseScore + speedScore;
			this.players[player].score += scoreIncrement;
		}
	}
}

module.exports = Quiz;
