'use strict';

var _ = require('lodash'),
    Q = require('q'),
    async = require('async'),
    Project,
    validate = require('../validate/validate'),
    Helper = require('./Helper'),
    aws = require('../aws/aws');

exports = module.exports = function(app, mongoose) {

  var userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String,
    email: { type: String, unique: true },
    roles: {
      admin: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
      account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' }
    },
    projects: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Project' }
    ],
    isActive: String,
    timeCreated: { type: Date, default: Date.now },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    twitter: {},
    github: {},
    facebook: {},
    google: {},
    search: [String]
  });

  // Crud for project management :
  // project == project instance passed from client
  // owner == username
  userSchema.statics.createProject = function(owner, project) {
    var _this = this;
    var Project = app.db.model('Project');
    var helper = Helper.initialize(app, mongoose);
    return Q.Promise(function(resolve, reject, notify) {

      helper.getProject(owner, project.name).then(
        function _resolve(project) {
          reject(new Error('project already exists'));
        },
        function _reject(err) {
          if(err.toString() != 'Error: No project found') {
            reject(err);
          } else {
            _this.findOne({'username': owner}, function(err, user) {
              if(err || !user) {
                err = !user ? new Error('No user found') : err;
                reject(err);
              } else {
                // validate project name
                var validation = validate.project(project.name);
                if(validation.error) {
                  reject(validation.error);
                  return;
                }

                // Create fresh projectDB instance
                var projectDB = new Project({
                  name: project.name,
                  owner: user._id,
                  pages: {}
                });

                // Validate and get page names
                if(project.pages) {
                  var pageNames = Object.keys(project.pages);
                  for(var i = 0; i < pageNames.length; i ++) {
                    var validation = validate.page(pageNames[i]);
                    if(validation.error){
                      reject(validation.error);
                      return;
                    }
                    projectDB.pages[pageNames[i]] = {
                      blocks: {}
                    };
                  }
                }

                // Save both sides of user and project
                projectDB.save(function(err, savedProject) {
                  if(err) {
                    reject(err)
                  } else {
                    savedProject.markModified('pages');
                    _this.addProject(user, savedProject).then(
                      function() {
                        resolve();
                      },
                      function(reason) {
                        reject(reason);
                      }
                    );
                  }
                });
              }
            });
          }
        }
      );
    });
  };

  userSchema.statics.addProject = function(user, project) {
    return Q.Promise(function(resolve, reject, notify) {
      user.projects.push(project._id);
      project.owner = user._id;
      async.parallel([
        function(done) {
          user.save(function(err) {
            done(err,null);
          });
        },
        function(done) {
          project.save(function(err) {
            done(err,null);   
          });
        }
      ], function(err, res) {
        if(err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  userSchema.statics.getProject = function(owner, projectName) {
    var helper = Helper.initialize(app, mongoose);
    return Q.Promise(function(resolve, reject, notify) {
      helper.getProject(owner, projectName).then(
        function _resolve(project) {
          resolve(project);
        },
        function _reject(err) {
          reject(err);
        }
      );
    });
  }

  // project == project instance passed from client
  // owner == username
  userSchema.statics.getProjectBlocks = function(owner, project) {
    var Project = app.db.model('Project');
    var _this = this;
    return Q.Promise(function(resolve, reject, notify) {
      _this.findOne({'username': owner}, function(err, user) {
        Project.findOne({'owner': user._id, 'name': project}, function(err, project) {
          aws.getBlocks(getBlockKeysFromProject(project), resolve);
        });
      });
    });
  };
  
  userSchema.statics.deleteProject = function(owner, project) {
    var User = app.db.model('User');
    var helper = Helper.initialize(app, mongoose);
    return Q.Promise(function(resolve, reject, notify) {
      helper.getProject(owner,project).then(
        function _resolve(project) {
          var blockKeys = [];
          var dataBlocks = helper.extractDataBlocksFromProject(project);
          _(dataBlocks).forEach(function(block) {
            blockKeys.push(block.key);
          });
          aws.deleteBlocks(blockKeys, function() {
            User.findOne({'username': owner}, function(err, user) {
              if(err) {
                reject(err);
              } else {
                var index = _(user.projects).indexOf(project._id);
                user.projects.splice(index, 1);
                user.save(function(err) {
                  if(err) {
                    reject(err);
                  } else {
                    project.remove(function(err) {
                      if(err) {
                        reject(err);
                      } else {
                        resolve();
                      }
                    });
                  }
                });
              }
            });
          }
          , reject);
        },
        function _reject(reason) {
          reject(reason);
        }
      );
    });
  };


  ////////////////////////////////////////////////////////////////////////////////////////////////////
  // Crud for project management :
  // project == project instance passed from client
  // owner == username
  userSchema.methods.createProject = function(project) {
    var _this = this,
        Project = app.db.model('Project'),
        helper = Helper.initialize(app, mongoose);

    return Q.Promise(function(resolve, reject, notify) {
      var newProject = new Project(project);
      // extract data blocks
      var dataBlocks = helper.extractDataBlocksFromProject(newProject);
      newProject.save(function(err) {
        _this.addProject(user, newProject).then(
          function _resolve_(value) {
            aws.putBlocks(dataBlocks, resolve, reject);
          },
          function _reject_(reason) {
            reject(reason);
          }
        );
      }); 
    });
  };

  userSchema.methods.getAccount = function() {
    var _this = this,
        Account = app.db.model('Account'),
        accountId = this.roles.account;

    return Q.Promise(function(resolve, reject, notify) {

      Account.findOne({_id: accountId}, function(err, account) {
        if(err) {
          reject(err);
        } else {
          resolve(account);
        }
      });

    });
  };

  userSchema.methods.canPlayRoleOf = function(role) {
    if (role === "admin" && this.roles.admin) {
      return true;
    }

    if (role === "account" && this.roles.account) {
      return true;
    }

    return false;
  };
  userSchema.methods.defaultReturnUrl = function() {
    var returnUrl = '/';
    if (this.canPlayRoleOf('account')) {
      returnUrl = '/account/';
    }

    if (this.canPlayRoleOf('admin')) {
      returnUrl = '/admin/';
    }

    return returnUrl;
  };

  // Only allow project with unique name to be added
  userSchema.methods.addProject = function(project) {
    //_.projects(project.name);
  };

  userSchema.statics.encryptPassword = function(password, done) {
    var bcrypt = require('bcrypt');
    bcrypt.genSalt(10, function(err, salt) {
      if (err) {
        return done(err);
      }

      bcrypt.hash(password, salt, function(err, hash) {
        done(err, hash);
      });
    });
  };
  userSchema.statics.validatePassword = function(password, hash, done) {
    var bcrypt = require('bcrypt');
    bcrypt.compare(password, hash, function(err, res) {
      done(err, res);
    });
  };
  userSchema.plugin(require('./plugins/pagedFind'));
  userSchema.index({ username: 1 }, { unique: true });
  userSchema.index({ email: 1 }, { unique: true });
  userSchema.index({ timeCreated: 1 });
  userSchema.index({ 'twitter.id': 1 });
  userSchema.index({ 'github.id': 1 });
  userSchema.index({ 'facebook.id': 1 });
  userSchema.index({ 'google.id': 1 });
  userSchema.index({ search: 1 });
  userSchema.set('autoIndex', (app.get('env') === 'development'));
  app.db.model('User', userSchema);
};
