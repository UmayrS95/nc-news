const { fetchArticleById } = require('../models/articlesM');

getArticleById = (req, res, next) => {
	const { article_id } = req.params;

	fetchArticleById(article_id).then(([ article
	]) => {
		res.status(200).send({ article });
	});
};

module.exports = getArticleById;
