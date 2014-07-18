var Q = require('q'),
    http = require('http');

exports.login = function (username, password) {
  return Q.Promise(function(resolve, reject, notify) {

    var post = JSON.stringify({
      errfor: {},
      errors: [],
      username: username,
      password: password
    }),
    options = {
      hostname: 'localhost',
      port: 3000,
      path: '/login/',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': post.length
      },
      method: 'POST'
    };

    var req = http.request(options, function(res) {
      res.on('data', function(data) {
      });
      res.on('end', function() {
        resolve(res.headers['set-cookie'][0].split(';').shift());
      });
    });

    req.on('error', function(e) {
      reject(e);
    });

    req.write(post);
    req.end();

  });
};

exports.sendJson = function(cookie, path, json) {
  json = JSON.stringify(json);
  return Q.Promise(function(resolve, reject, notify) {
    var options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': json.length,
        'Cookie': cookie
      },
      method: 'POST'
    },
    body = '',
    req = http.request(options, function(res) {
      res.on('data', function(data) {
        body += data;
      });
      res.on('end', function() {
        resolve(body);
      })
    });

    req.on('error', function(e) {
      reject(e);
    });

    req.write(json);
    req.end();

  });
};

exports.getPage = function(cookie, path) {
  return Q.Promise(function(resolve, reject, notify) {
    var options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      headers: {
        'Cookie': cookie
      },
      method: 'GET'
    },
    body = '',
    req = http.request(options, function(res) {
      res.on('data', function(data) {
        body += data;
      });
      res.on('end', function() {
        resolve(body);
      })
    });

    req.on('error', function(e) {
      reject(e);
    });

    req.end();

  });
};

exports.deleteReq = function(cookie, path) {
  return Q.Promise(function(resolve, reject, notify) {
    var options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      headers: {
        'Cookie': cookie
      },
      method: 'DELETE'
    },
    body = '',
    req = http.request(options, function(res) {
      res.on('data', function(data) {
        body += data;
      });
      res.on('end', function() {
        resolve(body);
      })
    });

    req.on('error', function(e) {
      reject(e);
    });

    req.end();

  });
};