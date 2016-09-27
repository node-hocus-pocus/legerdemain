var should = require('should');
var legerdemain = require('../index');
var getPostsEvent = require('./events/getPosts');

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
			var context = {
				succeed: function(data) {
					//console.log(data);
					done();
				},
				fail: done,
				done: done
			};
			handler(getPostsEvent(), context);
		});

    it('should accept and use a callback if provided', function(done) {
      var doFail = function() {
        done(new Error());
      };
      var context = {
        succeed: doFail,
        fail: done,
        done: doFail
      };
      var callback = function(err, data) {
        if (err) {
          done(err);
        } else {
          done();
        }
      };
      handler(getPostsEvent(), context, callback);
    });
	})
});
