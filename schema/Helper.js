'use strict';

var Q = require('q'),
    _ = require('lodash'),
    async = require('async'),
    Project,
    User,
    getProject;

exports.initialize = function(app, mongoose) {

  User = app.db.model('User');
  Project = app.db.model('Project');

  return {

    getProject: function(owner, project) {
      return Q.Promise(function(resolve, reject, notify) {
        User.findOne({'username': owner}, '_id' , function(err, user) {
          if(err || !user) {
            err = !user ? new Error('No user found') : err;
            reject(err); 
          } else {
            var projectName = project.name ? project.name : project;
            Project.findOne({'name': projectName, 'owner': user._id}, function(err, project) {
              if(err || !project) {
                err = !project ? new Error('No project found') : err;
                reject(err);
              } else {
                resolve(project);
              }
            });
          }
        });
      });
    },

    extractDataBlocksFromProject: function(project) {
      var blockDataArray = [],
      pageKeys, blockKeys;
      pageKeys  = Object.keys(project.pages);

      for(var i = 0; i < pageKeys.length; i ++) {
        var pageKey = pageKeys[i];
        blockKeys = Object.keys(project.pages[pageKey].blocks);
        for(var j = 0; j < blockKeys.length; j ++) {
          var blockKey = blockKeys[j];
          var newBlock = {
            key: project._id + pageKey + blockKey,
            content: project.pages[pageKey].blocks[blockKey].content
          };

          blockDataArray.push(newBlock);
          delete project.pages[pageKey].blocks[blockKey].content;
          project.pages[pageKey].blocks[blockKey].key = newBlock.key;
        }
      }

      return blockDataArray;
    }
  };
}