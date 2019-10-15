const usersRouter = require('express').Router();
const getUserByUsername = require('../controllers/usersC');

console.log('we in here <---------------');
usersRouter.route('/:username').get(getUserByUsername);

module.exports = usersRouter;
