process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const request = require('supertest');
const connection = require('../db/connection');
const app = require('../app');

beforeEach(() => connection.seed.run());
after(() => connection.destroy());

describe('app', () => {
	describe('/api', () => {
		describe('/topics', () => {
			describe('GET', () => {
				it('status:200 and returns topics', () => {
					return request(app).get('/api/topics').expect(200).then(({ body }) => {
						console.log(body);
						expect(body).to.be.an('object');
						expect(body.topics).to.be.an('array');
						expect(body.topics[0]).to.contain.keys('slug', 'description');
					});
				});
			});
		});
	});
});
