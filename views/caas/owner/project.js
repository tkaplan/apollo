/**
 * Examples:
 *
 *req.app.db.models.User
 **/

'use strict';

var rootPath = "../../../",
  Q = require('q'),
  businessRules = require(rootPath + "business_rules/business"),
  models,
  initializeModels,
  _ = require('lodash'),
  validate = require(rootPath + 'validate/validate'),
  aws = require(rootPath + 'aws/aws'),
  helper = {
    validateOwnerProject: function(owner, project) {
      return Q.promise(function(resolve, reject, notify) {
        if(
          !validate.username(owner).valid ||
          !validate.project(project).valid ) {
          reject(new Error('Username or project is not valid.'));
        }
        
        resolve();
      });
    },
    checkIfOwnerExists: function(owner) {
      return Q.promise(function(resolve, reject, notify) {
        var User = models.User;
        User.findOne({'username': owner}, '_id', function(err, user) {
          if(err) {
            reject(err);
          } else if (!user) {
            reject(new Error('User not found'));
          }

          resolve(user);
        });
      });
    },
    checkOwnerSameAsLoggedIn: function(owner, req) {
      return Q.promise(function(resolve, reject, notify) {
        if(owner != req.user.username) {
          reject(new Error('Logged in user is not the same as owner.'));
        } else {
          resolve(req.user);
        }
      });
    },
    checkOwnerViolatesBusinessRules: function(business) {
      return Q.Promise(function(resolve, reject, notify) {
        var rule = businessRules[business.rule];
        return rule(business.params, resolve, reject);
      });
    },
    projectProcedure: function(owner, projectName, business, req, res) {
      // Reject fxn
      var reject = function(reason) {
        res.status(400).send(JSON.stringify({
          errors: [reason]
        }));
      };

      // Get models object
      initializeModels(req.app.db.models);

      // Validate owner and project params
      return helper.validateOwnerProject(owner, projectName).then(
        function resolve(value) {
          // Check if owner exists
          return helper.checkIfOwnerExists(owner);
        },
        reject
      ).then(
        function resolve(value) {
          // Check if owner account violates business rules
          return helper.checkOwnerViolatesBusinessRules(business);
        },
        reject
      ).then(
        function resolve(value) {
          // Search for project using projectName and owner as composite key
          return models.User.getProject(owner, projectName);
        },
        reject
      );
    }
  };

initializeModels = function (mongooseModels) {
  models = mongooseModels;
};

exports.initializeModels = initializeModels;

exports.getProject = function(req, res){
  var owner = req.params.owner,
    project = req.params.project,
    business = {
      rule: 'getProject',
      params: {}
    };

  res.header('Content-Type','application/json');

  // Need to make a promise to synchronize code
  helper.projectProcedure(owner, project, business, req, res).
  then(function resolve(projectInst) {
    res.status(200).send(projectInst);
  }, function reject(reason) {
    res.status(400).send({
      errors: [
        reason
      ]
    });
  });
}

exports.list = function(req, res) {
  req.app.db.models.Project.tree(req.user.projects).
  then(
    function resolve(tree) {
      res.status(200).send(JSON.stringify(tree));
    },
    function reject(reason) {
      res.status(400).send(JSON.stringify({
        errors: [reason]
      }));
    }
  );
}

// To delete the project you must first be an owner
exports.delete = function(req, res) {
  var owner = req.params.owner,
      projectName = req.params.project;

  if(owner != req.user.username) {
    res.status(400).send(JSON.stringify('No permissions'));
    return;
  }

  req.app.db.models.Project.findOne({owner: req.user.id,name: projectName})
  .exec()
  .then(
    function(project) {
      var deleteKeys = [];
      var pageKeys = Object.keys(project.pages);
      for(var i = 0; i < pageKeys.length; i ++) {
        var page = project.pages[pageKeys[i]];
        var blockKeys = Object.keys(page.blocks);
        for(var j = 0; j < blockKeys.length; j ++) {
          var block = page.blocks[blockKeys[j]];
          deleteKeys.push(block.key);
        }
      }

      aws.deleteBlocks(
        deleteKeys,
        function() {
          async.parallel(
            [function(cb) {
              return req.app.db.models.User.findOneAndUpdate({id: req.user.id},{$pull:{projects:project.id}})
              .exec()
              .then(
                function(results) {
                  cb();
                },
                function(err) {
                  cb(err);
                }
              );
            }, function() {
              return req.app.db.models.Project.findByIdAndRemove(project.id)
              .exec()
              .then(
                function(results) {
                  cb();
                },
                function(err) {
                  cb(err);
                }
              );
            }],
            function(err) {
              if(err) {
                res.status(400).send(JSON.stringify(err));
              } else {
                res.status(204).send();
              }
            }
          );
        },
        function(err) {
          res.status(400).send(JSON.stringify(err));
        }
      )
    },
    function(err) {
      res.status(400).send(err);
    }
  );
};

exports.createProject = function(req, res){
  var owner = req.params.owner,
    projectName = req.params.project,
    project = req.body, 
    business = {
      rule: 'createProject',
      params: {}
    };
    project.name = projectName;

  res.header('Content-Type', 'application/json');

  // Need to make a promise to synchronize code
  helper.projectProcedure(owner, projectName, business, req, res).
  then(function resolve(projectInst) {
    res.status(400).send({
      errors: [
        new Error('Project exists')
      ]
    });
  }, function reject(reason) {
    if(reason.toString() == 'Error: No project found') {
      // Check if owner is the same as logged in user
      helper.checkOwnerSameAsLoggedIn(owner, req).then(
        function resolve() {
            models.User.createProject(owner,project).
            then(
              function resolve(value) {
                res.status(200).send(value);
              },
              function reject(reason) {
                res.status(400).send({
                  errors: [
                    reason
                  ]
                });
              }
            );
        },
        function reject(reason) {
          res.status(400).send({
            errors: [
              new Error('Cannot create another project under someone elses')
            ]
          });
        }
      );
    } else {
      res.status(400).send({
        errors: [
          reason
        ]
      })
    }
  });
};

exports.helper = helper;