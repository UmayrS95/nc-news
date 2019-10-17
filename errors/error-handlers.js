exports.handle400s = (err, req, res, next) => {
	const errorCodes = [
		'22P02',
		'23503',
		'42703'
	];
	if (errorCodes.includes(err.code)) {
		if (err.code === '23503') {
			res.status(400).send({ msg: 'user does not exist or comment is invalid' });
		}
		res.status(400).send({ msg: 'bad request' });
	} else {
		next(err);
	}
};

exports.handle500s = (err, req, res, next) => {
	console.log(err);
	res.status(500).send({ msg: 'internal server error' });
};

/*----------------------ERROR CONTROLLER-----------------------------*/

exports.handle405s = (req, res, next) => {
	console.log({ err: 'invalid method' });
	res.status(405).send({ msg: 'invalid method' });
};
