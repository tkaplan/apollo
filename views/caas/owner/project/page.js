'use strict';

var rootPath = "../../../../",
    validate = require(rootPath + 'validate/validate'),
    Q = require('q'),
    _ = require('lodash'),
    aws = require(rootPath + 'aws/aws'),
    projectProcedure = require('../project').helper.projectProcedure;

var pageProcedure = function(owner, projectName, pageName, business, req, res) {
  return Q.Promise(function(resolve, reject, notify) {
    var validatePage = validate.page(pageName);
    if(!validatePage.valid) {
      reject(validatePage.error);
    } else {
      projectProcedure(owner, projectName, business, req, res).then(
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

exports.pageProcedure = pageProcedure;

exports.getPage = function(req, res){
	var validatePage, 
      owner = req.params.owner,
		  projectName = req.params.project,
		  pageName = req.params.page,
      business = {
        rule: 'getPage',
        params: {}
      };

  res.header('Content-Type', 'application/json');

  pageProcedure(owner, projectName, pageName, business, req, res).then(
    function resolve(project) {
      var projectID = project._id;
      project.getPageContent(pageName).then(
        function _resolve(pageContent) {
          
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
                  var blockKeys = Object.keys(pageContent.blocks);
                  var keys = _.map(blockKeys, function(key) {
                    return projectID + pageName + key; 
                  });

                  // Set our keys
                  account.setGets(keys).then(
                    function() {
                      res.status(200).send(JSON.stringify(pageContent));
                    },
                    function(reason) {
                      res.status(400).send(reason.toString());
                    }
                  );
                }
              });
            }
          });

          ///////////// End Increment Gets //////////////////////

        },
        function _reject(reason) {
          res.status(400).send(reason.toString());
        }
      );
    },
    function reject(reason) {
      res.status(404).send(reason.toString());
    }
  );
  
};

exports.delete = function(req, res) {
  var owner = req.params.owner,
      projectName = req.params.project,
      pageName = req.params.page;
  if(owner != req.user.username) {
    res.status(400).send(JSON.stringify('No permissions'));
    return;
  }
  req.app.db.models.Project.findOne({owner: req.user.id,name: projectName})
  .exec()
  .then(
    function(project) {
      var deleteKeys = [];
      if(!project.pages[pageName]) {
        res.status(400).send('Page does not exist');
        return;
      }
      var page = project.pages[pageName];
      var blockKeys = Object.keys(page.blocks);
      for(var i = 0; i < blockKeys.length; i ++) {
        var block = page.blocks[blockKeys[i]];
        deleteKeys.push(block.key);
      }
      aws.deleteBlocks(
        deleteKeys,
        function() {
          delete project.pages[pageName];
          project.markModified('pages');
          project.save(function(err) {
            if(err) {
              res.status(400).send(JSON.stringify(err));
            } else {
              res.status(200).send();
            }
          });
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

exports.createPage = function(req, res){
  var validatePage, 
      owner = req.params.owner,
      projectName = req.params.project,
      page = req.body,
      business = {
        rule: 'createPage',
        params: {}
      },
      pageName = Object.keys(page)[0];

  res.header('Content-Type', 'application/json');

  pageProcedure(owner, projectName, pageName, business, req, res).then(
    function resolve(project) {
      var userId = req.user._id;
      if( !(_.contains(project.editors, userId) || userId.toString() == project.owner.toString()) ) {
        res.status(400).send({
          errors: ['You do not have permission to create pages']
        });
      } else {
        project.createPage(page).then(
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