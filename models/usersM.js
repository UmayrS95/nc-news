const connection = require('../db/connection');

exports.fetchUserByUsername = ({ username }) => {
	return connection.select().from('users').where('username', '=', username);
};
