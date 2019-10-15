const { expect } = require('chai');
const { formatDates, makeRefObj, formatComments } = require('../db/utils/utils');

describe('formatDates', () => {
	it('returns an empty array if passed an empty array', () => {
		expect(formatDates([])).to.eql([]);
	});
	it('can convert a timestamp into a date object', () => {
		expect(
			formatDates([
				{ created_at: 975242163389 }
			])
		).to.eql([
			{ created_at: new Date(975242163389) }
		]);
	});
	it('return an array of multiple objects with the appropriate key and date', () => {
		const objsArr = [
			{ created_at: 975242163389 },
			{ created_at: 1006778163389 },
			{ created_at: 1038314163389 }
		];

		const output = [
			{ created_at: new Date(975242163389) },
			{ created_at: new Date(1006778163389) },
			{ created_at: new Date(1038314163389) }
		];

		expect(formatDates(objsArr)).to.eql(output);
	});
	it('doesnt mutate the original array', () => {
		const objsArr = [
			{ created_at: 975242163389 },
			{ created_at: 1006778163389 },
			{ created_at: 1038314163389 }
		];
		const unAltered = [
			{ created_at: 975242163389 },
			{ created_at: 1006778163389 },
			{ created_at: 1038314163389 }
		];
		const invoc = formatDates(objsArr);

		expect(objsArr).to.eql(unAltered);
		expect(invoc).to.not.equal(objsArr);
		expect(invoc[0]).to.not.equal(objsArr[0]);
	});
});

describe('makeRefObj', () => {
	it('returns an empty object if passed an empty array', () => {
		expect(makeRefObj([])).to.eql({});
	});
	it('can create a reference obj for an passed obj', () => {
		const article = [
			{
				article_id: 12,
				title: 'Living in the shadow of a great man',
				topic: 'mitch',
				author: 'butter_bridge',
				body: 'I find this existence challenging',
				created_at: 1542284514171,
				votes: 100
			}
		];
		expect(makeRefObj(article)).to.eql({ 'Living in the shadow of a great man': 12 });
	});
	it('can create a reference obj for an array of objects', () => {
		const article = [
			{
				article_id: 12,
				title: 'Living in the shadow of a great man',
				topic: 'mitch',
				author: 'butter_bridge',
				body: 'I find this existence challenging',
				created_at: 1542284514171,
				votes: 100
			},
			{
				article_id: 14,
				title: 'Eight pug gifs that remind me of mitch',
				topic: 'mitch',
				author: 'icellusedkars',
				body: 'some gifs',
				created_at: 1289996514171
			},
			{
				article_id: 32,
				title: 'Student SUES Mitch!',
				topic: 'mitch',
				author: 'rogersop',
				body:
					'We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages',
				created_at: 1163852514171
			}
		];
		const output = {
			'Living in the shadow of a great man': 12,
			'Eight pug gifs that remind me of mitch': 14,
			'Student SUES Mitch!': 32
		};
		expect(makeRefObj(article)).to.eql(output);
	});
});

describe.only('formatComments', () => {
	it('returns an empty array if passed through an empty array', () => {
		expect(formatComments()).to.eql([]);
	});
	it('can format a comment object', () => {
		const comment = [
			{
				body:
					'What do you see? I have no idea where this will lead us. This place I speak of, is known as the Black Lodge.',
				belongs_to: 'UNCOVERED: catspiracy to bring down democracy',
				created_by: 'icellusedkars',
				votes: 16,
				created_at: 1101386163389
			}
		];

		const refObj = { 'UNCOVERED: catspiracy to bring down democracy': 1 };

		const output = [
			{
				body:
					'What do you see? I have no idea where this will lead us. This place I speak of, is known as the Black Lodge.',
				article_id: 1,
				author: 'icellusedkars',
				votes: 16,
				created_at: new Date(1101386163389)
			}
		];
		expect(formatComments(comment, refObj)).to.eql(output);
	});
	it('can format an array of comment objects', () => {
		const comment = [
			{
				body:
					'What do you see? I have no idea where this will lead us. This place I speak of, is known as the Black Lodge.',
				belongs_to: 'UNCOVERED: catspiracy to bring down democracy',
				created_by: 'icellusedkars',
				votes: 16,
				created_at: 1101386163389
			},
			{
				body:
					'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
				belongs_to: 'Living in the shadow of a great man',
				created_by: 'butter_bridge',
				votes: 14,
				created_at: 1479818163389
			}
		];

		const refObj = {
			'UNCOVERED: catspiracy to bring down democracy': 1,
			'Living in the shadow of a great man': 5
		};

		const output = [
			{
				body:
					'What do you see? I have no idea where this will lead us. This place I speak of, is known as the Black Lodge.',
				article_id: 1,
				author: 'icellusedkars',
				votes: 16,
				created_at: new Date(1101386163389)
			},
			{
				body:
					'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
				article_id: 5,
				author: 'butter_bridge',
				votes: 14,
				created_at: new Date(1479818163389)
			}
		];
		expect(formatComments(comment, refObj)).to.eql(output);
	});
	it('doesnt mutate original data', () => {
		const comment = [
			{
				body:
					'What do you see? I have no idea where this will lead us. This place I speak of, is known as the Black Lodge.',
				belongs_to: 'UNCOVERED: catspiracy to bring down democracy',
				created_by: 'icellusedkars',
				votes: 16,
				created_at: 1101386163389
			},
			{
				body:
					'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
				belongs_to: 'Living in the shadow of a great man',
				created_by: 'butter_bridge',
				votes: 14,
				created_at: 1479818163389
			}
		];

		const unaltered = [
			{
				body:
					'What do you see? I have no idea where this will lead us. This place I speak of, is known as the Black Lodge.',
				belongs_to: 'UNCOVERED: catspiracy to bring down democracy',
				created_by: 'icellusedkars',
				votes: 16,
				created_at: 1101386163389
			},
			{
				body:
					'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
				belongs_to: 'Living in the shadow of a great man',
				created_by: 'butter_bridge',
				votes: 14,
				created_at: 1479818163389
			}
		];
		const refObj = {
			'UNCOVERED: catspiracy to bring down democracy': 1,
			'Living in the shadow of a great man': 5
		};
		const formatted = formatComments(comment, refObj);

		expect(comment).to.not.equal(formatted);
		expect(comment[0]).to.not.eql(formatted[0]);
		expect(comment[0]).to.eql(unaltered[0]);
	});
});
