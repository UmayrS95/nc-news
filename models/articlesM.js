const connection = require('../db/connection');

exports.fetchArticleById = (article_id) => {
	return connection('articles')
		.select('articles.*')
		.count({ comment_count: 'comments.article_id' })
		.leftJoin('comments', 'articles.article_id', 'comments.article_id')
		.groupBy('articles.article_id')
		.where('articles.article_id', article_id);
};

exports.updateArticle = (inc_votes, articleId) => {
	return connection('articles').where('article_id', '=', articleId).increment('votes', inc_votes).returning('*');
};

exports.insertCommentToArticle = ({ article_id }, commentInfo) => {
	return connection('comments')
		.insert({ article_id, body: commentInfo.body, author: commentInfo.username })
		.returning('*');
};

exports.fetchCommentsByArticleId = (article_id, sort_by = 'created_at', order = 'desc') => {
	return connection('comments').where('article_id', '=', article_id).select('*').orderBy(sort_by, order);
};
