export const joinClasses = (...classes) => {
	return classes.join(" ");
};

export const copyToClipboard = text => {
	const temp = document.createElement("textarea");
	temp.value = text;
	document.body.appendChild(temp);
	temp.select();
	document.execCommand("copy");
	document.body.removeChild(temp);
};
