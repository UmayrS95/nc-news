const apiRouter = require('express').Router();
const topicsRouter = require('./topics-router.js');
const usersRouter = require('./users-router.js');
const articlesRouter = require('./articles-router');

apiRouter.use('/topics', topicsRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/articles', articlesRouter);

module.exports = apiRouter;
