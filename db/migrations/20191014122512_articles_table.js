exports.up = function (connection) {
	return connection.schema.createTable('articles', (articlesTable) => {
		articlesTable.increments('article_id').primary();
		articlesTable.string('title');
		articlesTable.text('body');
		articlesTable.integer('votes').defaultsTo(0);
		articlesTable.string('topic').references('topics.slug');
		articlesTable.string('author').references('users.username');
		articlesTable.timestamp('created_at').defaultsTo(connection.fn.now());
	});
};

exports.down = function (connection) {
	return connection.schema.dropTable('articles');
};
