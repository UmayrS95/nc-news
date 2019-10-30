const connection = require('../db/connection');

exports.fetchTopics = () => {
	return connection.select('*').from('topics');
};

exports.fetchTopicByTopicName = (topic) => {
	return connection.select('*').from('topics').where('slug', '=', topic);
};
