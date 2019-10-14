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

exports.makeRefObj = (list) => {
	if (list.length === 0) return {};

	const refObj = {};

	list.forEach((item) => {
		refObj[item.title] = item.article_id;
	});

	return refObj;
};

exports.formatComments = (comments, articleRef) => {};
