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

describe('makeRefObj', () => {});

describe('formatComments', () => {});
