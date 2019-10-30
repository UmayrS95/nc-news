const { fetchUserByUsername } = require('../models/usersM');

getUserByUsername = (req, res, next) => {
	const { username } = req.params;
	fetchUserByUsername(username)
		.then((user) => {
			if (user.length === 0) {
				res.status(404).send({ msg: 'user not found' });
			} else {
				res.status(200).send({ user: user[0] });
			}
		})
		.catch(next);
};

module.exports = getUserByUsername;
