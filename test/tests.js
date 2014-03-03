var expect = require('chai').expect;
var DAL = require("../dal.js");

suite("BV Node Tests", function() {

    test("Endpoint should be accessible", function() {
		DAL.getData(function(data) {
			expect(data).to.be.ok;
		});
	});

	test("Should return a list of sports", function() {
		DAL.getSports(function(data) {
			expect(data).to.be.ok;
			expect(data).to.have.property("length");
			expect(data.length).to.not.have.length(0);
		});
	});

	test("Should return a list of events for a given sport", function() {
		DAL.getEventsForSport(100, function(data) {
			expect(data).to.be.ok;
			expect(data).to.have.property("length");
			expect(data.length)
		});
	});

	test("Should return a list of outcomes for a given event", function() {
		DAL.getEventsOutcomes(100, 18831866800, function(data) {
			expect(data).to.be.ok;
			expect(data).to.have.property("length");
			expect(data.length)
		});
	});
});
