var Q = require('q'),
    should = require('should'),
    httpMock = require('../http-request');

describe('caas delete block', function() {
  var testPath = '/owner/taylor/project/anotherTestProject/page/newPageApollo/block/aCoolNewBlock';

  it('should work', function(done) {
    httpMock.login('taylor','fuckerface').then(
      function resolve(cookie) {
        httpMock.deleteReq(cookie, testPath).then(
          function resolve(value) {
            console.log('success' + value);
            done();
          },
          function reject(reason) {
            console.log(reason);
            done();
          }
        );
        done();
      },
      function reject(reason) {
        console.log(reason);
        done();
      }
    );
  });
  
});