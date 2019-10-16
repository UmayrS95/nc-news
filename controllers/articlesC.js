const { fetchArticleById, updateArticle } = require('../models/articlesM');

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

module.exports = { getArticleById, patchArticle };
