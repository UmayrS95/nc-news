const connection = require('../db/connection');

exports.fetchArticleById = (article_id) => {
	return connection('articles')
		.select('articles.*')
		.count({ comment_count: 'comments.article_id' })
		.leftJoin('comments', 'articles.article_id', 'comments.article_id')
		.groupBy('articles.article_id')
		.where('articles.article_id', article_id);
};

exports.updateArticle = (inc_votes = 0, articleId) => {
	return connection('articles').where('article_id', '=', articleId).increment('votes', inc_votes).returning('*');
};

exports.insertCommentToArticle = ({ article_id }, commentInfo) => {
	return connection('comments')
		.insert({ article_id, body: commentInfo.body, author: commentInfo.username })
		.returning('*');
};

exports.fetchCommentsByArticleId = (article_id, sort_by = 'created_at', order = 'desc') => {
	let orderDecide = order;
	if (order !== 'asc' && order !== 'desc') {
		orderDecide = 'desc';
	}
	return connection('comments').where('article_id', '=', article_id).select('*').orderBy(sort_by, orderDecide);
};

exports.fetchAllArticles = (sort_by = 'created_at', order = 'desc', author, topic) => {
	let orderDecide = order;
	return connection('articles')
		.select(
			'articles.author',
			'articles.title',
			'articles.article_id',
			'articles.topic',
			'articles.created_at',
			'articles.votes'
		)
		.count({ comment_count: 'comments.article_id' })
		.leftJoin('comments', 'articles.article_id', 'comments.article_id')
		.groupBy('articles.article_id')
		.orderBy(sort_by, orderDecide)
		.modify((query) => {
			if (author) {
				query.where('articles.author', '=', author);
			}
			if (topic) {
				query.where('articles.topic', '=', topic);
			}
		});
};
