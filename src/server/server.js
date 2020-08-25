const app = require("express")();
const server = require("http").createServer(app);
const socketIo = require("socket.io");
const QuizManager = require("./Entities/quizManager");

const PORT = process.env.PORT || 4001;

const io = socketIo(server);

const quizManager = new QuizManager();

io.on("connection", socket => {
	socket.on("create_room", (room, callback) => {
		// Handle Error Here
		socket.join(room, () => {
			callback({
				status: "Success",
				roomID: room,
			});
		});
	});

	socket.on("join_room", (room, callback) => {
		if (io.sockets.adapter.rooms[room]) {
			socket.join(room, () => {
				callback({ status: "Success", roomID: room });
				socket.to(room).emit("player_joined");
			});
		} else callback({ status: "Failed", message: "Room Doesn't Exist" });
	});

	socket.on("submit_answer", answer => {
		const quiz = quizManager.getQuizByPlayer(socket.id);
		if (quiz) quiz.checkAnswer(socket.id, answer);
	});

	socket.on("get_next_question", async () => {
		const player = socket.id;
		const quiz = quizManager.getQuizByPlayer(player);
		if (quiz && quiz.players[player].isHost) {
			const question = await quiz.getNextQuestion(player);
			io.to(quiz.room).emit("next_question", question);
			const score = quiz.getScore(player);
			io.to(quiz.room).emit("update_score", score);
		}
	});
	socket.on("start_game", quizConfig => {
		const { roomID, ...quizOptions } = quizConfig;
		if (io.sockets.adapter.rooms[roomID]) {
			const room = io.sockets.adapter.rooms[roomID];
			const nMembers = room.length;
			if (nMembers !== 2) {
				// Handle Error Here
				return "error";
			}
			io.to(roomID).emit("start_game_ack", roomID);
			const players = room.sockets;
			const host = socket.id;
			quizManager.addQuiz(players, roomID, quizOptions, host);
		}
	});

	socket.on("disconnecting", () => {
		const player = socket.id;
		const quiz = quizManager.getQuizByPlayer(socket.id);
		if (quiz) {
			const score = quiz.getScore();
			io.to(quiz.room).emit("opponent_left", score);
			quizManager.cleanup(quiz);
		}
	});
});

server.listen(PORT, () => console.log("**** Socket IO ****"));
