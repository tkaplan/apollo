var Q = require('q'),
    should = require('should'),
    httpMock = require('../http-request');

describe('caas put block', function() {
  var testPath = '/owner/taylor/project/anotherTestProject/page/newPageApollo/block/aCoolNewBlock',
      testJson = {
        'aCoolNewBlock': {
          'content': 'Hey this is really easy!!!!!'
        }
      };

  it('should work', function(done) {
    httpMock.login('taylor','fuckerface').then(
      function resolve(cookie) {
        httpMock.sendJson(cookie, testPath, testJson).then(
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