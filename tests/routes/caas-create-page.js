var Q = require('q'),
    should = require('should'),
    httpMock = require('../http-request');

describe('caas create page', function() {
  var testPath = '/owner/taylor/project/anotherTestProject/page/newPage',
      testJson = {
            'newPageApollo': {
              'blocks': {
                'blockTest': {
                  'content': 'create page test'
                },
                'blockTest1': {
                  'content': 'create more stuff!!!'
                }
              }
            }
          };

  it.skip('should redirect to /login/', function(done) {
    httpMock.sendJson(null, testPath, testJson).then(
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

  it('should login', function(done) {
    httpMock.login('taylor','fuckerface').then(
      function resolve(cookie) {
        console.log(cookie);
        done();
      },
      function reject(reason) {
        console.log(reason);
        done();
      }
    );
  });

  it.skip('should work', function(done) {
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
