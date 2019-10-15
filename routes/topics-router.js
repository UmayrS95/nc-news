const topicsRouter = require('express').Router();
const { getTopics } = require('../controllers/topicsC.js');

topicsRouter.get('/', getTopics);

module.exports = topicsRouter;
