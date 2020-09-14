import shortid from "shortid";

export const generateRoomID = () => {
	shortid.characters(
		"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@"
	);
	const roomID = shortid.generate();
	return roomID;
};
