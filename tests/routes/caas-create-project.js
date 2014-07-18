var Q = require('q'),
    should = require('should'),
    httpMock = require('../http-request');

describe('caas create project', function() {
  var testPath = '/owner/taylor/project/anotherTestProject',
      testJson = {
          'name': 'anotherTestProject',
          'pages': {
            'page1': {
              'blocks': {
                'blockTest': {
                  'content': 'yo this is some pretty cool shit'
                },
                'blockTest1': {
                  'content': 'ok tis may or may not work!'
                }
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