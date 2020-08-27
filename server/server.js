const app = require("express")();
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
				callback({ status: "Success", roomID: room });
				socket.quizRoom = room;
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
					callback({ status: "Success", roomID });
					socket.quizRoom = room;
					socket.to(roomID).emit("player_joined");
				});
			else {
				callback({ status: "Failed", message: "Room Already has Two Members" });
			}
		} else callback({ status: "Failed", message: "Room Doesn't Exist" });
	});

	socket.on("submit_answer", answer => {
		const quiz = quizManager.getQuiz(socket.quizRoom);
		if (quiz) quiz.checkAnswer(socket.id, answer);
	});

	socket.on("get_next_question", async () => {
		const player = socket.id;
		const quiz = quizManager.getQuiz(socket.quizRoom);
		if (quiz) {
			const question = await quiz.getNextQuestion(player);
			io.to(quiz.room).emit("next_question", question);
			const score = quiz.getScore(player);
			io.to(quiz.room).emit("update_score", score);
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
			io.to(roomID).emit("start_quiz_ack", roomID);
			const players = room.sockets;
			const host = socket.id;
			quizManager.addQuiz(players, roomID, quizOptions, host);
		}
	});

	socket.on("disconnecting", () => {
		const room = socket.quizRoom;
		const quiz = quizManager.getQuiz(socket.quizRoom);
		if (quiz) {
			const score = quiz.getScore();
			io.to(room).emit("opponent_left", score);
			quizManager.cleanup(quiz);
		} else {
			io.to(room).emit("opponent_left");
		}
		socket.quizRoom = null;
	});
});

server.listen(PORT, () => console.log("**** Socket IO ****"));
