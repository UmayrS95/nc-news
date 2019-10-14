const { expect } = require('chai');
const { formatDates, makeRefObj, formatComments } = require('../db/utils/utils');

describe('formatDates', () => {
	it('returns an array', () => {
		expect(formatDates([])).to.be.an('array');
	});
	it('returns an empty array if passed an empty array', () => {
		expect(formatDates([])).to.eql([]);
	});
	it('can convert a timestamp into a date object', () => {
		expect(formatDates([ { created_at: 975242163389 } ])).to.eql([ { created_at: new Date(975242163389) } ]);
	});
	it('return an array of multiple objects with the appropriate key and date', () => {
		const objsArr = [ { created_at: 975242163389 }, { created_at: 1006778163389 }, { created_at: 1038314163389 } ];

		const output = [
			{ created_at: new Date(975242163389) },
			{ created_at: new Date(1006778163389) },
			{ created_at: new Date(1038314163389) }
		];

		expect(formatDates(objsArr)).to.eql(output);
	});
	it('doesnt mutate the original array', () => {
		const objsArr = [ { created_at: 975242163389 }, { created_at: 1006778163389 }, { created_at: 1038314163389 } ];
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
	it('returns an object', () => {
		expect(makeRefObj([])).to.be.an('object');
	});
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

describe('formatComments', () => {});
