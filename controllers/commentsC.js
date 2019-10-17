const { updateCommentVotes, removeComment } = require('../models/commentsM');

patchCommentVotes = (req, res, next) => {
	const { inc_votes } = req.body;
	const { comment_id } = req.params;
	updateCommentVotes(inc_votes, comment_id)
		.then(([ comment
		]) => {
			res.status(200).send({ comment });
		})
		.catch(next);
};

deleteComment = (req, res, next) => {
	const { comment_id } = req.params;
	removeComment(comment_id)
		.then(() => {
			res.status(204).send();
		})
		.catch(next);
};

module.exports = { patchCommentVotes, deleteComment };
