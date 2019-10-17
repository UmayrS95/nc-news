const commentsRouter = require('express').Router();
const { patchCommentVotes, deleteComment } = require('../controllers/commentsC');
const { handle405s } = require('../errors/error-handlers');

commentsRouter.route('/:comment_id').patch(patchCommentVotes).delete(deleteComment).all(handle405s);

module.exports = commentsRouter;
