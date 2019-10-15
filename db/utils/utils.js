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

exports.formatComments = (comments, articleRef) => {
	if (!comments) return [];
	const formatted = [];

	comments.forEach((comment) => {
		let newObj = { ...comment };
		newObj.author = newObj.created_by;
		delete newObj.created_by;
		newObj.article_id = articleRef[newObj.belongs_to];
		delete newObj.belongs_to;
		newObj.created_at = new Date(newObj.created_at);
		formatted.push(newObj);
	});

	return formatted;
};
