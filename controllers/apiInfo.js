apiInfo = (req, res, next) => {
	res.status(200).send({
		'GET /api': {
			description: 'serves up a json representation of all the available endpoints of the api'
		},
		'GET /api/topics': {
			description: 'serves an array of all topics',
			queries: [],
			exampleResponse: {
				topics: [
					{ slug: 'football', description: 'Footie!' }
				]
			}
		},
		'GET /api/users/:username': {
			description: 'serves a user by their username',
			queries: [],
			exampleResponse: {
				user: {
					avatar_url: 'https://avatars2.githubusercontent.com/u/24394918?s=400&v=4',
					name: 'paul',
					username: 'rogersop'
				}
			}
		},
		'GET /api/articles': {
			description: 'serves an array of all topics',
			queries: [
				'author',
				'topic',
				'sort_by',
				'order'
			],
			exampleResponse: {
				articles: [
					{
						title: 'Seafood substitutions are increasing',
						topic: 'cooking',
						author: 'weegembump',
						body: 'Text from the article..',
						created_at: 1527695953341
					}
				]
			}
		},
		'GET /api/articles/:article_id': {
			description: "serves a single article by it's id",
			queries: [],
			exampleResponse: {
				article: {
					article_id: 1,
					title: 'Living in the shadow of a great man',
					body: 'I find this existence challenging',
					votes: 100,
					topic: 'mitch',
					author: 'butter_bridge',
					created_at: '2018-11-15T12:21:54.171Z',
					comment_count: '13'
				}
			}
		},
		'POST /api/:article_id/comments': {
			description: "allows you to post a comment to an article by it's id",
			queries: [],
			exampleRequest: { username: 'rogersop', body: 'great article friend' },
			exampleResponse: {
				comment: {
					comment_id: 1,
					author: 'username',
					article_id: 1,
					votes: 17,
					created_at: '2017-11-22T12:36:03.389Z',
					body: 'Text from posted comment'
				}
			}
		},
		'GET /api/:article_id/comments': {
			description: 'serves an array of comments linked to an article',
			queries: [],
			exampleResponse: {
				comments: [
					'an array of comment objects'
				]
			}
		},
		'PATCH /api/comments/:comment_id': {
			description: "allows you to upvote a comment by it's id",
			queries: [],
			exampleRequest: { inc_votes: 1 },
			exampleResponse: {
				comment: {
					comment_id: 1,
					author: 'butter_bridge',
					article_id: 9,
					votes: 17,
					created_at: '2017-11-22T12:36:03.389Z',
					body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!"
				}
			}
		},
		'DELETE /api/comments/:comment_id': {
			description: "allows you to delete a comment by it's id",
			queries: [],
			exampleResponse: {}
		}
	});
};

module.exports = apiInfo;
