exports.handle400s = (err, req, res, next) => {
	const errorCodes = [
		'22P02',
		'23503',
		'42703'
	];
	if (errorCodes.includes(err.code)) {
		if (err.code === '23503') {
			res.status(400).send({ msg: 'user does not exist or comment is invalid' });
		} else {
			res.status(400).send({ msg: 'bad request' });
		}
	} else {
		next(err);
	}
};

exports.handleCustoms = (err, req, res, next) => {
	if (err.status) res.status(err.status).send({ msg: err.msg });
	else next(err);
};

exports.handle500s = (err, req, res, next) => {
	res.status(500).send({ msg: 'internal server error' });
};

/*----------------------ERROR CONTROLLER-----------------------------*/

exports.handle405s = (req, res, next) => {
	res.status(405).send({ msg: 'invalid method' });
};
