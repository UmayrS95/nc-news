apiInfo = (req, res, next) => {
	res.status(200).send({
		'/topics': 'Can perform a GET request on this route which will give back all the available topics',
		'/users':
			'Can perform a GET request on this endpoint with a parametric of a username (/:username) which will return a single users info',
		'/articles':
			"Can perform a GET request on this route which will return all article info. Optionally you can add an id parametric (/api/articles/:article_id) to get an article by it's id. As well as a GET request you can perform a PATCH on this route to update the votes for whichever article you want. You must send this as an object in this format {inc_votes: <number here>}. If you wish to filter the articles by author or topic (or both), you can attach a query to the articles endpoint (/api/articles?<author or topic here>=<valid author or topic here>). If you want the  comments associated with a particular article, use a GET request on the endpoint of comments added after the article id (/api/articles/:article_id/comments).  This endpoint can also take queries to sort the comments recieved in a valid way (/api/articles/:article_id/comments?sort_by=<valid sort by value here e.g. author>). If you want these ordered you can do this by adding an order query (/api/articles/:article_id/comment?order=<asc for ascending order, desc for descending order>). These queries can be chained together with &&. You can also add your own comment on this endpoint by performing a POST request. You must send the comment with a valid username in this format: {username: <username here>, body: <comment here>}.",
		'/comments/:comment_id':
			'This endpoint allows you to perform either a PATCH request to update the votes of a specific comment, or a DELETE request to delete a specific comment. For the PATCH request, you must send the vote increment you do with the articles PATCH request: {inc_votes: <number here>}. For the DELETE request, simply make the delete request on the comment id of the comment you wish to delete.'
	});
};

module.exports = apiInfo;
