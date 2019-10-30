const connection = require('../db/connection');

exports.updateCommentVotes = (inc_votes, comment_id) => {
	return connection('comments').where('comment_id', '=', comment_id).increment('votes', inc_votes).returning('*');
};

exports.removeComment = (comment_id) => {
	return connection('comments').where('comment_id', '=', comment_id).del();
};

exports.fetchCommentById = (comment_id) => {
	return connection('comments').where('comment_id', '=', comment_id).select('*');
};
