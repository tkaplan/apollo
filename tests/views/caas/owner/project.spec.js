'use strict';

var rootPath = '../../../../',
    project = require(rootPath + 'views/caas/owner/project'),
    app = require(rootPath + 'tests/db-mock').app,
    mongoose = require(rootPath + 'tests/db-mock').mongoose,
    should = require('should'),
    dataFixtures = require(rootPath + 'tests/data_fixtures/build-user-projects'),
    Q = require('q'),
    getProjectBusinessRule = {
      rule: 'getProject',
      params: {}
    },
    createProjectBusinessRule = {
      rule: 'createProject',
      params: {}
    },
    resMock = {
      status: function(status) {
        return {
          send: function(obj) {}
        }
      }
    },
    reqMock = {
      app: {
        db: {
          models: dataFixtures.models
        }
      }
    };

describe('vews/caas/owner/project', function() {
  before(function(done) {
    dataFixtures.buildUsersAndProjects(project, function() {
      done();
    });
  });

  after(function(done) {
    dataFixtures.clearUsersAndProjects(function() {
      done();
    });
  });

  describe('helper', function() {
    describe('validateOwnerProject', function() {
      var validateOwnerProject = project.helper.validateOwnerProject;

      it('should reject since username is not valid', function() {
        var defer = Q.defer();

        validateOwnerProject('invalidUserName!@#$','validProjectName').
        then(function(value) {
          defer.reject();
        }, function(reason) {
          reason.toString().should.equal('Error: Username or project is not valid.');
          defer.resolve();
        });

        return defer.promise;
      });

      it('should reject since projectname is not valid', function() {
        var defer = Q.defer();

        validateOwnerProject('validUser','invalideProjectName!@#').
        then(function(value) {
          defer.reject();
        }, function(reason) {
          reason.toString().should.equal('Error: Username or project is not valid.');
          defer.resolve();
        });

        return defer.promise;
      });

      it('should reject since both username and project is not valid', function() {
        var defer = Q.defer();

        validateOwnerProject('invalidUser!@#','invalideProjectName!@#').
        then(function(value) {
          defer.reject();
        }, function(reason) {
          reason.toString().should.equal('Error: Username or project is not valid.');
          defer.resolve();
        });

        return defer.promise;
      });

      it('should resolve since both username and project is valid', function() {
        var defer = Q.defer();

        validateOwnerProject('validUser','validProjectName').
        then(function(value) {
          defer.resolve();
        }, function(reason) {
          throw new Error('validUser and valid project did not resolve');
          defer.reject();
        });

        return defer.promise;
      });
    });

    describe('checkIfOwnerExists', function() {
        var checkIfOwnerExists = project.helper.checkIfOwnerExists;

        it('testOwner should exist', function() {
          var defer = Q.defer();
          checkIfOwnerExists('testUser').then(
            function resolve(value) {
              if(!value)
                throw new Error('testUser should exist');
              defer.resolve();
            }
          );
          return defer.promise
        });
    });

    describe('checkOwnerSameAsLoggedIn', function() {
      it('testOwner should be the same as logged in', function(done) {
        var checkOwnerSameAsLoggedIn = project.helper.checkOwnerSameAsLoggedIn,
            owner = 'hello',
            req = {username: 'hello'};
        checkOwnerSameAsLoggedIn(owner, req).then(
          function(value) {
            done();
          },
          function(reason) {
            throw reason
            done();
          }
        );
      });

      it('testOwner should be the same as logged in', function(done) {
        var checkOwnerSameAsLoggedIn = project.helper.checkOwnerSameAsLoggedIn,
            owner = 'hello',
            req = {username: 'hello2'};

        checkOwnerSameAsLoggedIn(owner, req).then(
          function(value) {
            throw new Error('Owner is not the same as logged in user');
            done();
          },
          function(reason) {
            done();
          }
        );
      });
    });

    describe('checkOwnerViolatesBusinessRules', function() {
      it('getProject should just pass', function(done) {
        var checkOwnerViolatesBusinessRules = project.helper.checkOwnerViolatesBusinessRules;
        checkOwnerViolatesBusinessRules({rule:'getProject',params:{}}).then(
          function resolve(value) {
            done();
          },
          function reject(reason) {
            throw new Error('This shouldn\'t have been rejected');
          }
        );
      });

      it('createProject should just pass', function(done) {
        var checkOwnerViolatesBusinessRules = project.helper.checkOwnerViolatesBusinessRules;
        checkOwnerViolatesBusinessRules({rule:'createProject',params:{}}).then(
          function resolve(value) {
            done();
          },
          function reject(reason) {
            throw new Error('This shouldn\'t have been rejected');
          }
        );
      });
    });

    describe('getProject', function() {
      it('should retrieve testProject', function(done) {
        var getProject = project.helper.getProject;
        app.db.model('User').findOne({'username': 'testUser'}, '_id', function(err, user) {
          getProject(user._id, 'testProject').then(
            function resolve(value) {
              done();
            },
            function reject(reason) {
              throw new Error('testProject should exist');
              done();
            }
          );
        });
      });

      it('testProject2 should not exist', function(done) {
        var getProject = project.helper.getProject;
        app.db.model('User').findOne({'username': 'testUser'}, '_id', function(err, user) {
          getProject(user._id, 'testProject2').then(
            function resolve(value) {
              throw new Error('testProject2 should not exist');
              done();
            },
            function reject(reason) {
              done();
            }
          );
        });
      });

      it('testUser2 should not exist', function(done) {
        var getProject = project.helper.getProject;
        getProject('223', 'testProject').then(
          function resolve(value) {
            throw new Error('testUser2 should not exist');
            done();
          },
          function reject(reason) {
            done();
          }
        );
      });
    });

    describe('projectProcedure', function() {
      it('should get project with testUser, testProject, madeUpBusinessRule, resMock', function(done) {
        var projectProcedure = project.helper.projectProcedure;
        projectProcedure('testUser', 'testProject', getProjectBusinessRule, reqMock, resMock).then(
          function resolve(value) {
            value.name.should.equal('testProject');
            done();
          },
          function reject(reason) {
            console.log(reason);
            throw new Error('This should have resolved');
            done();
          }
        );
      });
      it('should get not project with testUser, testProject2, madeUpBusinessRule, resMock', function(done) {
        var projectProcedure = project.helper.projectProcedure;
        projectProcedure('testUser', 'testProject2', getProjectBusinessRule, reqMock, resMock).then(
          function resolve(value) {
            throw new Error('This should not have resolved');
            done();
          },
          function reject(reason) {
            done();
          }
        );
      });
      it('should get project with testUser2, testProject, madeUpBusinessRule, resMock', function(done) {
        var projectProcedure = project.helper.projectProcedure;
        projectProcedure('testUser2', 'testProject', getProjectBusinessRule, reqMock, resMock).then(
          function resolve(value) {
            throw new Error('This should not have resolved');
            done();
          },
          function reject(reason) {
            done();
          }
        );
      });
    });
  });
});