var rootPath = "../../",
    app =  require("../db-mock").app,
    mongoose = require("../db-mock").mongoose,
    User,
    Project,
    Q = require('q');

    require(rootPath + 'schema/User')(app, mongoose);
    require(rootPath + 'schema/Project')(app, mongoose);

    var models = {
      User: app.db.model('User'),
      Project: app.db.model('Project')
    };

    User = models.User;
    Project = models.Project;

exports.models = models;

exports.buildUsersAndProjects = function(project, callback) {
  // Create models
  project.initializeModels(models);

  // Inject data fixtures
  var testUser = new User({
    username: 'testUser',
    password: 'password',
    email: 'testUser@test.com',
    isActive: 'true'
  });

  var testBlock11 = {
    name: 'testBlock11',
    content: 'http://aws.com/object/testBlock11'
  };

  var testBlock12 = {
    name: 'testBlock12',
    content: 'http://aws.com/object/testBlock12'
  };

  var testBlock21 = {
    name: 'testBlock21',
    content: 'http://aws.com/object/testBlock21'
  };

  var testBlock22 = {
    name: 'testBlock22',
    content: 'http://aws.com/object/testBlock22'
  };

  var testPage1 = {
    name: 'testPage1',
    blocks: [
      testBlock11,
      testBlock12
    ]
  };

  var testPage2 = {
    name: 'testPage2',
    blocks: [
      testBlock21,
      testBlock22
    ]
  };

  var testProject = new Project({
    owner: null,
    name: 'testProject',
    pages: [
      testPage1,
      testPage2
    ]
  });

  testUser.save(function(err) {
    if(err) {
      callback();
    } else {
      testProject.save(function(err) {
        testUser.projects.push(testProject._id);
        testProject.owner = testUser._id;
        testUser.save(function(err) {
          testProject.save(function(err) {
            User.findOne({_id: testProject.owner}, function(err, User) {
              callback();
            })
          });
        });
      });
    }
  });
};

exports.clearUsersAndProjects = function(callback) {
  User.remove(function() {
    Project.remove(function() {
      callback();
    });
  });
};