const { fetchUserByUsername } = require('../models/usersM');

getUserByUsername = (req, res, next) => {
	fetchUserByUsername(req.params)
		.then((user) => {
			console.log({ user });
			res.status(200).send({ user });
		})
		.catch(next);
};

module.exports = getUserByUsername;
