exports.formatDates = (list) => {
	if (list.length === 0) return [];

	const newArr = [];

	list.forEach((item) => {
		let newObj = { ...item };
		newObj.created_at = new Date(newObj.created_at);
		newArr.push(newObj);
	});

	return newArr;
};

exports.makeRefObj = (list) => {};

exports.formatComments = (comments, articleRef) => {};
