var Q = require('q'),
    should = require('should'),
    httpMock = require('../http-request');

describe('caas get page', function() {
  var testPath = '/owner/taylor/project/anotherTestProject/page/page1';

  it('should work', function(done) {
    httpMock.getPage(null, testPath).then(
      function resolve(value) {
        console.log(value);
        done();
      },
      function reject(reason) {
        console.log(reason);
        done();
      }
    );
  });
  
});