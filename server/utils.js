const unescape = require("he").unescape;

const decodeHtml = htmlString => {
	return unescape(htmlString);
};

const shuffleChoices = choices => {
	let currentIdx = choices.length,
		temp,
		randomIdx;

	while (0 !== currentIdx) {
		randomIdx = Math.floor(Math.random() * currentIdx);
		currentIdx--;
		temp = choices[currentIdx];
		choices[currentIdx] = choices[randomIdx];
		choices[randomIdx] = temp;
	}

	// decodeHtml
	const decodedChoices = choices.map(choice => decodeHtml(choice));
	return decodedChoices;
};

module.exports = {
	decodeHtml,
	shuffleChoices,
};
