'use strict';

var rootPath = "../../../../../",
    validate = require(rootPath + 'validate/validate'),
    Q = require('q'),
    _ = require('lodash'),
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
          console.log('page procedure, resolved!');
          resolve(project);
        },
        function _reject(reason) {
          console.log('page procedure, rejected :( ' + reason);
          reject(reason);
        }
      );
    }
  });
};

exports.blockProcedure = blockProcedure;

exports.putBlock = function(req, res){
  var validatePage, 
      owner = req.params.owner,
      projectName = req.params.project,
      pageName = req.params.page,
      blockName = req.params.block,
      block = req.body,
      business = {
        rule: 'deleteBlock',
        params: {}
      },
      blockName = Object.keys(block)[0];
      console.log('vars defined');
      
  blockProcedure(owner, projectName, pageName, blockName, business, req, res).then(
    function resolve(project) {
      if(!hasEditPermissions(req.user, project)) {
          console.log('permissions bs');
          res.status(400).send({
          errors: ['You do not have permission to delete block.']
        });
      } else if(!project.pages[pageName]) {
          console.log('page does not exist bs: ' + pageName);
          res.status(404).send({
          errors: ['Page does not exist']
        });
      } else {
        project.putBlock(pageName, block).then(
          function resolve(value) {
            console.log('we resolved stuff');
            console.log(value);
            res.status(200).send();
          },
          function reject(reason) {
            console.log(reason);
            res.status(400).send({
              errors: [reason]
            });
          }
        );
      }
    },
    function reject(reason) {
      console.log(reason);
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
      
  blockProcedure(owner, projectName, pageName, blockName, business, req, res).then(
    function resolve(project) {
      console.log('did it make it this far?');
      if(!hasEditPermissions(req.user, project)) {
        console.log('no permissions');
        res.status(400).send({
          errors: ['You do not have permission to delete block.']
        });
      } else if(!project.pages[pageName]) {
        console.log('bad page name');
        res.status(404).send({
          errors: ['Page does not exist']
        });
      } else if(!project.pages[pageName].blocks[blockName]) {
        console.log('no block found');
        res.status(404).send({
          errors: ['Block does not exist']
        });
      } else {
        console.log('now we delete the block');
        project.deleteBlock(pageName, blockName).then(
          function resolve(value) {
            console.log('first time?');
            res.status(200).send();
          },
          function reject(reason) {
            console.log(reason);
            res.status(400).send({
              errors: [reason]
            });
          }
        );
      }
    },
    function reject(reason) {
      console.log(reason);
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