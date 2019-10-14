exports.up = function (connection) {
	console.log('creating comments table...');
	return connection.schema.createTable('comments', (commentsTable) => {
		commentsTable.increments('comment_id').primary();
		commentsTable.string('author').references('users.username');
		commentsTable.integer('article_id').references('articles.article_id');
		commentsTable.integer('votes').defaultsTo(0);
		commentsTable.timestamp('created_at').defaultsTo(connection.fn.now());
		commentsTable.text('body');
	});
};

exports.down = function (connection) {
	console.log('dropping comments table...');
	return connection.schema.dropTable('comments');
};
