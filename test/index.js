var should = require('should');
var legerdemain = require('../index');

describe('Legerdemain', function() {

	it('should be a function', function() {
		legerdemain.should.be.a.Function();
	});

	describe('Express App', function() {
		var handler;

		before(function() {
			handler = require('./expressapp/app').handler;
		});

		it('should have a handler', function() {
			handler.should.be.a.Function();
		});

		it('should accept an event and context', function(done) {
			var event = require('./events/get_posts.json');
			var context = {
				succeed: function(data) {
					console.log(data);
					done();
				},
				fail: done,
				done: done
			};
			handler(event, context);
		});
	})
});