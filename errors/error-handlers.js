exports.handle500s = (err, req, res, next) => {
	console.log(err);
	res.status(500).send({ msg: 'internal server error' });
};

/*---------------------------------------------------*/

exports.handle405s = (req, res, next) => {
	console.log({ err: 'invalid method' });
	res.status(405).send({ msg: 'invalid method' });
};
