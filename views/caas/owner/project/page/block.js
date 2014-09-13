'use strict';

var rootPath = "../../../../../",
    validate = require(rootPath + 'validate/validate'),
    Q = require('q'),
    _ = require('lodash'),
    aws = require(rootPath + 'aws/aws'),
    pageProcedure = require('../page').pageProcedure;

var hasEditPermissions = function(user, project) {
  return _.contains(project.editors, user._id) || (project.owner.toString() == user._id.toString());
}

var blockProcedure = function(owner, projectName, pageName, blockName, business, req, res) {
  return Q.Promise(function(resolve, reject, notify) {
    var validateBlock = validate.block(blockName);
    if(!validateBlock.valid) {
      reject(validateBlock.error);
    } else {
      pageProcedure(owner, projectName, pageName, business, req, res).then(
        function _resolve(project) {
          resolve(project);
        },
        function _reject(reason) {
          reject(reason);
        }
      );
    }
  });
};

exports.blockProcedure = blockProcedure;

exports.get = function(req, res) {
  var validatePage, 
      owner = req.params.owner,
      projectName = req.params.project,
      pageName = req.params.page,
      blockName = req.params.block,
      business = {
        rule: 'getBlock',
        params: {}
      };

  res.header('Content-Type', 'application/json');
      
  blockProcedure(owner, projectName, pageName, blockName, business, req, res).then(
    function resolve(project) {
      if(!hasEditPermissions(req.user, project)) {
        res.status(400).send(JSON.stringify({
          errors: ['You do not have edit permissions.']
        }));
      } else if(!project.pages[pageName]) {
        res.status(404).send(JSON.stringify({
          errors: ['Page does not exist']
        }));
      } else if(!project.pages[pageName].blocks[blockName]) {
        res.status(404).send(JSON.stringify({
          errors: ['Block does not exist']
        }));
      } else {
        aws.getBlock(
          project.pages[pageName].blocks[blockName],
          function resolve(content) {
            res.status(200).send(JSON.stringify(content));
          },
          function reject(reason) {
            res.status(400).send(JSON.stringify(reason));
          }
        );
      }
    },
    function reject(reason) {
      res.status(404).send(
        {
          errors: [
            reason
          ]
        }
      );
    }
  );
}

exports.putBlock = function(req, res){
  var validatePage, 
      owner = req.params.owner,
      projectName = req.params.project,
      pageName = req.params.page,
      blockName = Object.keys(req.body)[0],
      block = req.body,
      business = {
        rule: 'deleteBlock',
        params: {}
      },
      blockName = Object.keys(block)[0];

  res.header('Content-Type', 'application/json');
      
  blockProcedure(owner, projectName, pageName, blockName, business, req, res).then(
    function resolve(project) {

      var projectID = project._id;
      var content = block[blockName].content;

      if(!hasEditPermissions(req.user, project)) {
          res.status(400).send({
          errors: ['You do not have permission to delete block.']
        });
      } else if(!project.pages[pageName]) {
          res.status(404).send({
          errors: ['Page does not exist']
        });
      } else {
        project.putBlock(pageName, block).then(
          function resolve(value) {

            //////////// Start Increment Gets ////////////////////////
            req.app.db.models.User.
            findOne({username: owner},'roles.account', function(err, user) {
              if(err) {
                res.status(400).send(err);
              } else {
                req.app.db.models.Account.
                findOne({_id: user.roles.account}, function(err, account) {
                  if(err) {
                    res.status(400).send(err);
                  } else {
                    
                    var key = projectID + pageName + blockName;
                    if(account.statExists(key)) {
                      // Set our keys
                      account.incrementPut(key, content.toString('utf8')).then(
                        function() {
                          res.status(204).send();
                        },
                        function(reason) {
                          res.status(400).send(reason.toString());
                        }
                      );
                    } else {
                      // Set our keys
                      account.createStat(key, content.toString('utf8')).then(
                        function() {
                          res.status(204).send();
                        },
                        function(reason) {
                          res.status(400).send(reason.toString());
                        }
                      );
                    }
                  }
                });
              }
            });
            ///////////// End Increment Gets //////////////////////

          },
          function reject(reason) {
            res.status(400).send({
              errors: [reason]
            });
          }
        );
      }

    },
    function reject(reason) {
      res.status(404).send(
        {
          errors: [
            reason
          ]
        }
      );
    }
  );
};

exports.deleteBlock = function(req, res){
  var validatePage, 
      owner = req.params.owner,
      projectName = req.params.project,
      pageName = req.params.page,
      blockName = req.params.block,
      business = {
        rule: 'deleteBlock',
        params: {}
      };

  res.header('Content-Type', 'application/json');
      
  blockProcedure(owner, projectName, pageName, blockName, business, req, res).then(
    function resolve(project) {
      if(!hasEditPermissions(req.user, project)) {
        res.status(400).send({
          errors: ['You do not have permission to delete block.']
        });
      } else if(!project.pages[pageName]) {
        res.status(404).send({
          errors: ['Page does not exist']
        });
      } else if(!project.pages[pageName].blocks[blockName]) {
        res.status(404).send({
          errors: ['Block does not exist']
        });
      } else {
        project.deleteBlock(pageName, blockName).then(
          function resolve(value) {
            res.status(200).send();
          },
          function reject(reason) {
            res.status(400).send({
              errors: [reason]
            });
          }
        );
      }
    },
    function reject(reason) {
      res.status(404).send(
        {
          errors: [
            reason
          ]
        }
      );
    }
  ); 
};