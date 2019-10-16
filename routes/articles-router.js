const articlesRouter = require('express').Router();
const getArticleById = require('../controllers/articlesC');
const { handle405s } = require('../errors/error-handlers');

articlesRouter.route('/:article_id').get(getArticleById).patch(patchArticle).all(handle405s);

module.exports = articlesRouter;
