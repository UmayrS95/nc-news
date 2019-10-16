const usersRouter = require('express').Router();
const getUserByUsername = require('../controllers/usersC');
const { handle405s } = require('../errors/error-handlers');

usersRouter.route('/:username').get(getUserByUsername).all(handle405s);

module.exports = usersRouter;
