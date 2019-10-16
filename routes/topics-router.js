const topicsRouter = require('express').Router();
const { getTopics } = require('../controllers/topicsC.js');
const { handle405s } = require('../errors/error-handlers');

topicsRouter.route('/').get(getTopics).all(handle405s);

module.exports = topicsRouter;
