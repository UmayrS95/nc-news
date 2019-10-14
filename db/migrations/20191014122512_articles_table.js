exports.up = function (connection) {
	console.log('creating articles table...');
	return connection.schema.createTable('articles', (articlesTable) => {
		articlesTable.increments('article_id').primary();
		articlesTable.string('title');
		articlesTable.string('body');
		articlesTable.integer('votes').defaultsTo(0);
		articlesTable.string('topic').references('topics.slug');
		articlesTable.string('author').references('users.username');
		articlesTable.timestamp('created_at').defaultsTo(connection.fn.now());
	});
};

exports.down = function (connection) {
	console.log('dropping articles table...');
	return connection.schema.dropTable('articles');
};
