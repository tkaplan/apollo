var Q = require('q'),
    should = require('should'),
    exec = require('child_process').exec,
    httpMock = require('../http-request');

describe('caas get notices', function() {
  var testPath = '/caas/account/notices',
      testJson = {
            project: 'captainAwesome'
          };

  it('should work', function(done) {
  	exec('node ../billingE2E --', function(err, stdout, stderr) {
  		console.log();
  		httpMock.login('tkaplan','fuckerface').then(
	      function resolve(cookie) {
	        httpMock.sendJson(cookie, testPath, testJson).then(
	          function resolve(value) {
	            console.log(value);
	            done();
	          },
	          function reject(reason) {
	            console.log(reason);
	            done();
	          }
	        );
	      },
	      function reject(reason) {
	        console.log(reason);
	        done();
	      }
	    );
	  });
  });
});
