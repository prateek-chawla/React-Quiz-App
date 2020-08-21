const app = require("express")();
const server = require("http").createServer(app);
const socketIo = require("socket.io");

const PORT = process.env.PORT || 4001;

const io = socketIo(server);

io.on("connection", socket => {
	console.log("Connected Socket ");

	// console.log("connected");
	// 	socket.on("ferret", function (arg, ack) {
	// 		console.log("ferret", arg, "arg");
	// 		ack("woot");
	//     });
	console.log("ROOMs", socket.rooms);

	socket.on("create_room", (room, callback) => {
		// console.log(socket.rooms);
		console.log(room, socket.id);
		console.log("Rooms", socket.rooms);
		// socket.join("ABC");
		socket.join(room, () => {
			console.log("rooms ", socket.rooms);
			callback({ status: "Success", roomID: room });
		});
		// console.log(socket.rooms);
		// console.log(io.sockets.adapter.rooms)
		// console.log(socket)
	});

	socket.on("join_room", (room, callback) => {
		if (io.sockets.adapter.rooms[room]) {
			socket.join(room, () => {
				console.log("rooms ", socket.rooms);
                callback({ status: "Success", roomID: room });
                socket.to(room).emit('player_joined')
			});
		} else callback({ status: "Failed", message: "Room Doesn't Exist" });
	});
});

server.listen(PORT, () => console.log("listening socket io"));
