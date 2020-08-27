class Player {
	constructor(roomID, isHost) {
		this.score = 0;
		this.roomID = roomID;
		this.isHost = isHost;
		this.time = null;
	}
}

module.exports = Player;
