'use strict';

var rootPath = "../../../../",
    validate = require(rootPath + 'validate/validate'),
    Q = require('q'),
    _ = require('lodash'),
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
		  project = req.params.project,
		  page = req.params.page,
      business = {
        rule: 'getPage',
        params: {}
      };

  pageProcedure(owner,project,page, business, req, res).then(
    function resolve(project) {
      if(project.pages[page]) {
        res.status(200).send(
          project.pages[page]
        );
      } else {
        res.status(404).send(
          {
            errors: [
              'Page not found'
            ]
          }
        );
      }
    },
    function reject(reason) {
      if(!reason) {
        reason = 'Project not found'
      }

      res.status(404).send(reason.toString());
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
            console.log(reason);
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