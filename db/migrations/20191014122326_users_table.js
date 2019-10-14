exports.up = function (connection) {
	console.log('creating users table...');
	return connection.schema.createTable('users', (usersTable) => {
		usersTable.string('avatar_url');
		usersTable.string('name').notNullable();
		usersTable.string('username').unique().notNullable().primary();
	});
};

exports.down = function (connection) {
	console.log('dropping users table...');
	return connection.schema.dropTable('users');
};
