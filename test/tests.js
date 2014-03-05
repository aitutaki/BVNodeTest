var assert = require('assert');
var DAL = require("../dal.js");
console.log("DAL is " + DAL);

describe("DAL", function() {

	var urlOK = null;

	it("should have an accessible endpoint", function(done) {
		assert.doesNotThrow(function() {
			DAL.getData(function(ok) {
				urlOK = ok;
				done();			
			});
		});
	});

	it("Should return a list of sports", function(done) {
		DAL.getSports(function(data) {
			assert(data, "No data returned.");
			assert(data.length !== 0);
			done();
		});
	});

	it("Should return a list of events for a given sport", function(done) {
		DAL.getEventsForSport(100, function(data) {
			assert(data, "No data returned.");
			assert(data.length !== 0);
			done();
		});
	});

	it("Should return a list of outcomes from a given event", function(done) {
		DAL.getEventOutcomes(100, 18831866800, function(data) {
			assert(data, "No data returned.");
			assert(data.length !== 0);
			done();
		});
	});

});
