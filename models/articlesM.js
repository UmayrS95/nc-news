const connection = require('../db/connection');

exports.fetchArticleById = (article_id) => {
	return connection('articles')
		.select('articles.*')
		.count({ comment_count: 'comments.article_id' })
		.leftJoin('comments', 'articles.article_id', 'comments.article_id')
		.groupBy('articles.article_id')
		.where('articles.article_id', article_id);
};
