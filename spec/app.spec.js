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
		});
		describe('/users', () => {
			describe('/:username', () => {
				it('status:200 and returns the user info by username', () => {
					return request(app).get('/api/users/rogersop').expect(200).then(({ body }) => {
						expect(body).to.be.an('object');
						expect(body.user[0]).to.contain.keys('avatar_url', 'name', 'username');
					});
				});
			});
		});
	});
});
