const express = require("express");
const path = require("path");
const app = express();
const server = require("http").createServer(app);
const socketIo = require("socket.io");
const QuizManager = require("./Entities/quizManager");

const PORT = process.env.PORT || 4001;

const io = socketIo(server);

const quizManager = new QuizManager();

io.on("connection", socket => {
	socket.on("create_room", (room, callback) => {
		try {
			if (io.sockets.adapter.rooms[room]) {
				throw "Error in Creating Room";
			}
			socket.join(room, () => {
				socket.quizRoom = room;
				callback({ status: "Success", roomID: room });
			});
		} catch (error) {
			callback({ status: "Failed", message: error });
		}
	});

	socket.on("join_room", (roomID, callback) => {
		const room = io.sockets.adapter.rooms[roomID];
		if (room) {
			if (room.length === 1)
				socket.join(roomID, () => {
					socket.quizRoom = roomID;
					socket.to(roomID).emit("player_joined");
					callback({ status: "Success", roomID });
				});
			else {
				callback({ status: "Failed", message: "Room Already has Two Members" });
			}
		} else callback({ status: "Failed", message: "Room Doesn't Exist" });
	});

	socket.on("submit_answer", answer => {
		const player = socket.id;
		const quiz = quizManager.getQuiz(socket.quizRoom);
		if (quiz) {
			const isCorrect = quiz.checkAnswer(player, answer);
			const score = quiz.getScore();
			io.to(quiz.room).emit("update_score", { score, player, isCorrect });
		}
	});

	socket.on("get_next_question", async () => {
		const quiz = quizManager.getQuiz(socket.quizRoom);
		if (quiz) {
			const question = await quiz.getNextQuestion();
			const score = quiz.getScore();
			io.to(quiz.room).emit("update_score", { score, player: null, isCorrect: null });
			io.to(quiz.room).emit("next_question", question);
		}
	});
	socket.on("start_quiz", quizConfig => {
		const { roomID, ...quizOptions } = quizConfig;
		if (io.sockets.adapter.rooms[roomID]) {
			const room = io.sockets.adapter.rooms[roomID];
			const nMembers = room.length;
			if (nMembers !== 2) {
				// Handle Error Here
				return "error";
			}

			const players = room.sockets;
			const host = socket.id;
			quizManager.addQuiz(players, roomID, quizOptions, host);
			const quiz = quizManager.getQuiz(roomID);

			io.to(roomID).emit("start_quiz_ack", { roomID: quiz.room, duration: quiz.duration });
		}
	});

	socket.on("disconnecting", () => {
		const room = socket.quizRoom;
		const quiz = quizManager.getQuiz(socket.quizRoom);
		io.to(room).emit("opponent_left");
		if (quiz) quizManager.cleanup(quiz);
		socket.quizRoom = null;
	});
});

app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname + "/../client/build/index.html"));
});

server.listen(PORT, () => console.log(`Socket IO PORT# ${PORT}`));
