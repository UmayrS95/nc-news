const {
	fetchArticleById,
	updateArticle,
	insertCommentToArticle,
	fetchCommentsByArticleId,
	fetchAllArticles
} = require('../models/articlesM');
const { fetchUserByUsername } = require('../models/usersM');
const { fetchTopicByTopicName } = require('../models/topicsM');

getArticleById = (req, res, next) => {
	const { article_id } = req.params;

	fetchArticleById(article_id)
		.then(([ article
		]) => {
			if (article) {
				res.status(200).send({ article });
			} else {
				next({ status: 404, msg: 'article not found' });
			}
		})
		.catch(next);
};

patchArticle = (req, res, next) => {
	if (req.body.hasOwnProperty('inc_votes')) {
		const { inc_votes } = req.body;
		const { article_id } = req.params;
		updateArticle(inc_votes, article_id)
			.then(([ article
			]) => {
				res.status(200).send({ article });
			})
			.catch(next);
	} else {
		const { article_id } = req.params;
		fetchArticleById(article_id).then(([ article
		]) => {
			res.status(200).send({ article });
		});
	}
};

postCommentToArticle = (req, res, next) => {
	const { article_id } = req.params;
	fetchArticleById(article_id)
		.then(([ article
		]) => {
			if (article) {
				if (req.body.hasOwnProperty('username', 'body')) {
					insertCommentToArticle(req.params, req.body)
						.then(([ comment
						]) => {
							res.status(201).send({ comment });
						})
						.catch(next);
				} else {
					next({ status: 400, msg: 'bad request' });
				}
			} else {
				next({ status: 404, msg: 'path not found' });
			}
		})
		.catch(next);
};

getCommentsByArticleId = (req, res, next) => {
	const { sort_by } = req.query;
	const { order } = req.query;
	const { article_id } = req.params;

	fetchArticleById(article_id)
		.then(([ article
		]) => {
			if (!article) {
				next({ status: 404, msg: 'article not found' });
			} else {
				fetchCommentsByArticleId(article_id, sort_by, order)
					.then((comments) => {
						res.status(200).send({ comments });
					})
					.catch(next);
			}
		})
		.catch(next);
};

getAllArticles = (req, res, next) => {
	const { sort_by } = req.query;
	const { order } = req.query;
	const { author } = req.query;
	const { topic } = req.query;

	if (author) {
		fetchUserByUsername(author)
			.then(([ user
			]) => {
				if (!user) {
					next({ status: 404, msg: 'author not found' });
				} else {
					fetchAllArticles(sort_by, order, author, topic).then((articles) => {
						res.status(200).send({ articles });
					});
				}
			})
			.catch(next);
	} else if (topic) {
		fetchTopicByTopicName(topic)
			.then(([ topicRes
			]) => {
				if (!topicRes) {
					next({ status: 404, msg: 'topic not found' });
				} else {
					fetchAllArticles(sort_by, order, author, topic).then((articles) => {
						res.status(200).send({ articles });
					});
				}
			})
			.catch(next);
	} else {
		fetchAllArticles(sort_by, order, author, topic)
			.then((articles) => {
				res.status(200).send({ articles });
			})
			.catch(next);
	}
};

module.exports = { getArticleById, patchArticle, postCommentToArticle, getCommentsByArticleId, getAllArticles };
