const app = require("express")();
const server = require("http").createServer(app);
const socketIo = require("socket.io");
const QuizManager = require("./quiz");

const PORT = process.env.PORT || 4001;

const io = socketIo(server);

const quizManager = new QuizManager();

io.on("connection", socket => {
	// let quiz;
	socket.on("create_room", (room, callback) => {
		socket.join(room, () => {
			callback({ status: "Success", roomID: room });
		});
	});

	socket.on("join_room", (room, callback) => {
		if (io.sockets.adapter.rooms[room]) {
			socket.join(room, () => {
				// console.log("rooms ", socket.rooms);
				callback({ status: "Success", roomID: room });
				socket.to(room).emit("player_joined");
			});
		} else callback({ status: "Failed", message: "Room Doesn't Exist" });
	});

	socket.on("submit_answer", answer => {
		// console.log("asnwer event ", answer);
		const quiz = quizManager.getQuizByPlayer(socket.id);
		if (quiz) quiz.checkAnswer(socket.id, answer);
	});

	// socket.on("get_score", (_,updateScore) => {
	// 	const player = socket.id;
	// 	const quiz = quizManager.getQuizByPlayer(player);
	// 	const score = quiz.getScore(player);
	// 	updateScore(score)
	// })

	socket.on("get_next_question", async () => {
		const player = socket.id;
		const quiz = quizManager.getQuizByPlayer(player);
		if (quiz && quiz.players[player].isHost) {
			// console.log("emitting events");
			const question = await quiz.getNextQuestion(player);
			io.to(quiz.room).emit("next_question", question);
			const score = quiz.getScore(player);
			io.to(quiz.room).emit("update_score", score);
			// quiz.getNextQuestion(socket).then(question => {
			// 	// console.log(`Sending Question to Room ${quiz.room}`);
			// 	// console.log("quiz line#40", quiz);
			// 	// console.log("question response", question);
			// 	io.to(quiz.room).emit("next_question", question);

			// 	// console.log("quiz line#42", quiz);
			// 	const score = quiz.getScore(player);
			// 	// console.log("score", score);
			// 	io.to(quiz.room).emit("update_score", score);
			// });
		}
	});
	socket.on("start_game", quizConfig => {
		//Handle Errors
		const { roomID, ...quizOptions } = quizConfig;
		if (io.sockets.adapter.rooms[roomID]) {
			const room = io.sockets.adapter.rooms[roomID];
			const nMembers = room.length;
			if (nMembers === 2) {
				io.to(roomID).emit("start_game_ack", roomID);
			}
			const players = room.sockets;
			// console.log(socket.rooms);
			const host = socket.id;
			quizManager.addQuiz(players, roomID, quizOptions, host);
		}

		// else callback({ status: "Failed", message: "Room Doesn't Have Enough Members" });
	});
});

server.listen(PORT, () => console.log("**** Socket IO ****"));
