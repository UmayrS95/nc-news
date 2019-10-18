const {
	fetchArticleById,
	updateArticle,
	insertCommentToArticle,
	fetchCommentsByArticleId,
	fetchAllArticles
} = require('../models/articlesM');

getArticleById = (req, res, next) => {
	const { article_id } = req.params;

	fetchArticleById(article_id)
		.then(([ article
		]) => {
			res.status(200).send({ article });
		})
		.catch(next);
};

patchArticle = (req, res, next) => {
	const { inc_votes } = req.body;
	const { article_id } = req.params;
	updateArticle(inc_votes, article_id)
		.then(([ article
		]) => {
			res.status(200).send({ article });
		})
		.catch(next);
};

postCommentToArticle = (req, res, next) => {
	insertCommentToArticle(req.params, req.body)
		.then(([ comment
		]) => {
			res.status(201).send({ comment });
		})
		.catch(next);
};

getCommentsByArticleId = (req, res, next) => {
	const { sort_by } = req.query;
	const { order } = req.query;
	const { article_id } = req.params;
	fetchCommentsByArticleId(article_id, sort_by, order)
		.then((comments) => {
			res.status(200).send({ comments });
		})
		.catch(next);
};

getAllArticles = (req, res, next) => {
	const { sort_by } = req.query;
	const { order } = req.query;
	const { author } = req.query;
	const { topic } = req.query;
	fetchAllArticles(sort_by, order, author, topic)
		.then((articles) => {
			res.status(200).send({ articles });
		})
		.catch(next);
};

module.exports = { getArticleById, patchArticle, postCommentToArticle, getCommentsByArticleId, getAllArticles };
