const { fetchUserByUsername } = require('../models/usersM');

getUserByUsername = (req, res, next) => {
	console.log('we now in here <-----');

	fetchUserByUsername(req.params)
		.then((user) => {
			res.status(200).send({ user });
		})
		.catch(next);
};

module.exports = getUserByUsername;
