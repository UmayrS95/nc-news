exports.up = function (connection) {
	return connection.schema.createTable('users', (usersTable) => {
		usersTable.string('avatar_url');
		usersTable.string('name').notNullable();
		usersTable.string('username').unique().notNullable().primary();
	});
};

exports.down = function (connection) {
	return connection.schema.dropTable('users');
};
