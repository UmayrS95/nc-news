exports.up = function (connection) {
	console.log('creating topics table...');
	return connection.schema.createTable('topics', (topicsTable) => {
		topicsTable.string('slug').primary().unique();
		topicsTable.string('description');
	});
};

exports.down = function (connection) {
	console.log('dropping topics table...');
	return connection.schema.dropTable('topics');
};
