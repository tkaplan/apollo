
var app = require('../db-mock').app,
    Q = require('q'),
    project,
    helper,
    mongoose = require('../db-mock').mongoose;

describe("User", function() {
  this.timeout(10000);
  before(function(done) {
    require('../../schema/User')(app,mongoose);
    require('../../schema/Project')(app,mongoose);
    helper = require('../../schema/Helper').initialize(app,mongoose);

    project = {
      name: 'awsProject1',
      pages: {
        'awsPage11': {
          blocks: {
            'awsBlock111': {
              content: '<p>this is test block111</p>'
            },
            'awsBlock112': {
              content: '<p>this is test block112</p>'
            }
          }
        },
        'awsPage12': {
          blocks: {
            'awsBlock121': {
              content: '<p>this is test block121</p>'
            },
            'awsBlock122': {
              content: '<p>this is test block122</p>'
            }
          }
        }
      }
    }

    var testUser = new (app.db.model('User'))({
      'username': 'testUser',
      'password': 'password',
      'isActive': true,
      'email': 'testUser@test.com'
    });
    testUser.save(function(err) {
      done();
    });
  });

  it("Should allow me to set username", function(done) {
    var User = app.db.model('User');

    User.createProject('testUser', project).then(
      function resolve(value) {
        done();
      }, function reject(reason) {
        done();
      }
    );
  });

  it("sdf", function(done) {
    var User = app.db.model('User');
    var Project = app.db.model('Project');

    Project.createPage('testUser','awsProject1','pageNewName').then(
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

  it('dele', function(done) {
    var User = app.db.model('User');
    var Project = app.db.model('Project');

    Project.deletePage('testUser','awsProject1','awsPage11').then(
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

  it('dele2', function(done) {
    var User = app.db.model('User');
    var Project = app.db.model('Project');

    Project.putBlock('testUser','awsProject1','awsPage12',{'newBlock':{content: 'New content!'}}).then(
      function resolve(value) {
        done();
      },
      function reject(reason) {
        console.log(reason);
        done();
      }
    );
  });

  it('dele3', function(done) {
    var User = app.db.model('User');
    var Project = app.db.model('Project');

    Project.deleteBlocks('testUser','awsProject1','awsPage12',['awsBlock122','awsBlock121']).then(
      function resolve(value) {
        done();
      },
      function reject(reason) {
        console.log(reason);
        done();
      }
    );
  });

  after('should work', function(done) {
    var User = app.db.model('User');

    User.deleteProject('testUser','awsProject1').then(
      function resolve(value) {
        done();
      },
      function reject(reason) {
        done();
      }
    );
  });

});