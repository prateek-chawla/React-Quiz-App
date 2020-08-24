const unescape = require("he").unescape;

const decodeHtml = htmlString => {
	return unescape(htmlString);
};

module.exports = {
	decodeHtml,
};
