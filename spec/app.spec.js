process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const request = require('supertest');
const connection = require('../db/connection');
const app = require('../app');

beforeEach(() => connection.seed.run());
after(() => connection.destroy());

describe('app', () => {
	it('status:404 path not found for an incorrect endpoint', () => {
		return request(app).get('/apil/tpofd').expect(404).then(({ body }) => {
			expect(body.msg).to.equal('path not found');
		});
	});
	describe('/api', () => {
		describe('/topics', () => {
			describe('GET', () => {
				it('status:200 and returns topics', () => {
					return request(app).get('/api/topics').expect(200).then(({ body }) => {
						expect(body).to.be.an('object');
						expect(body.topics).to.be.an('array');
						expect(body.topics[0]).to.contain.keys('slug', 'description');
					});
				});
			});
			describe('other methods', () => {
				it('status:405 for all invalid methods on path', () => {
					return request(app).post('/api/topics').expect(405).then(({ body }) => {
						expect(body.msg).to.equal('invalid method');
					});
				});
			});
		});
		describe('/users', () => {
			describe('/:username', () => {
				describe('GET', () => {
					it('status:200 and returns the user info by username', () => {
						return request(app).get('/api/users/rogersop').expect(200).then(({ body }) => {
							expect(body).to.be.an('object');
							expect(body.user[0]).to.contain.keys('avatar_url', 'name', 'username');
						});
					});
				});
				describe('other methods', () => {
					it('status:405 for all other invalid methods on path', () => {
						return request(app).post('/api/users/umayr95').expect(405).then(({ body }) => {
							expect(body.msg).to.equal('invalid method');
						});
					});
				});
			});
		});
		describe('/articles', () => {
			describe('/:article_id', () => {
				describe('GET', () => {
					it('status:200 and returns the requested article', () => {
						return request(app).get('/api/articles/1').expect(200).then(({ body }) => {
							expect(body.article).to.contain.keys(
								'article_id',
								'title',
								'body',
								'votes',
								'topic',
								'author',
								'created_at',
								'comment_count'
							);
							expect(body.article.article_id).to.equal(1);
						});
					});
					it('status:200 and requested article has a count of comments linked to the article', () => {
						return request(app).get('/api/articles/1').expect(200).then(({ body }) => {
							expect(body.article.comment_count).to.equal('13');
						});
					});
					it('status:400 if bad request', () => {
						return request(app).get('/api/articles/tigers').expect(400).then(({ body }) => {
							expect(body.msg).to.equal('bad request');
						});
					});
				});
				describe('PATCH', () => {
					it('status:200 and returns article with updated key', () => {
						return request(app).patch('/api/articles/1').send({ inc_votes: 1 }).expect(200).then(({ body }) => {
							expect(body.article).to.contain.keys(
								'article_id',
								'title',
								'body',
								'votes',
								'topic',
								'author',
								'created_at'
							);
							expect(body.article.votes).to.equal(101);
						});
					});
					it('status:400 if invalid parametric used', () => {
						return request(app).patch('/api/articles/fruit').send({ inc_votes: 1 }).expect(400).then(({ body }) => {
							expect(body.msg).to.equal('bad request');
						});
					});
					it('status:400 if invalid key value usesd on body in req', () => {
						return request(app).patch('/api/articles/1').send({ inc_votes: 'apple' }).expect(400).then(({ body }) => {
							expect(body.msg).to.equal('bad request');
						});
					});
				});
				describe('invalid methods', () => {
					it('status:405 for any invalid methods on this path', () => {
						return request(app).put('/api/articles/1').expect(405).then(({ body }) => {
							expect(body.msg).to.equal('invalid method');
						});
					});
				});
			});
			describe('/:article_id/comments', () => {
				describe('POST', () => {
					it('status:201 and returns the successfully created comment', () => {
						return request(app)
							.post('/api/articles/1/comments')
							.send({ username: 'rogersop', body: 'great article friend' })
							.expect(201)
							.then(({ body }) => {
								expect(body.comment).to.contain.keys(
									'comment_id',
									'author',
									'article_id',
									'votes',
									'created_at',
									'body'
								);
							});
					});
					it('status:400 if invalid parametric used', () => {
						return request(app)
							.post('/api/articles/fruit/comments')
							.send({ username: 'rogersop', body: 'great article friend' })
							.expect(400)
							.then(({ body }) => {
								expect(body.msg).to.equal('bad request');
							});
					});
					it('status:400 if req body is invalid', () => {
						return request(app)
							.post('/api/articles/1/comments')
							.send({ username: 2, body: 2 })
							.expect(400)
							.then(({ body }) => {
								expect(body.msg).to.equal('bad request');
							});
					});
				});

				describe.only('GET', () => {
					it('status:200 and responds with an array of comments linked to the article', () => {
						return request(app).get('/api/articles/1/comments').expect(200).then(({ body }) => {
							expect(body.comments).to.be.an('array');
						});
					});
					it('defaults order of comments by created_at in descending', () => {
						return request(app).get('/api/articles/1/comments').expect(200).then(({ body }) => {
							expect(body.comments[0].comment_id).to.equal(2);
						});
					});
					it('can take queries to order by a selected key in asc/desc', () => {
						return request(app)
							.get('/api/articles/1/comments?sort_by=author&&order=desc')
							.expect(200)
							.then(({ body }) => {
								expect(body.comments[0].author).to.equal('icellusedkars');
							});
					});
				});
				describe('invalid methods', () => {
					it('status:405 if an invalid method is used on this path', () => {
						return request(app)
							.put('/api/articles/1/comments')
							.send({ username: 'rogersop', body: 'great article friend' })
							.expect(405)
							.then(({ body }) => {
								expect(body.msg).to.equal('invalid method');
							});
					});
				});
			});
		});
	});
});
