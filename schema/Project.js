'use strict';

var Q = require('q'),
    _ = require('lodash'),
    async = require('async'),
    Helper = require('./Helper'),
    aws = require('../aws/aws'),
    validate = require('../validate/validate'),
    User;

exports = module.exports = function(app, mongoose) {  

  // We must allow composite key search via projectName and owner
  var projectSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    editors: [ {type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    name: { type: String, unique: true },
    pages: { type: mongoose.Schema.Types.Mixed }
  });

  var processNewPage = function(project, page) {

    var blockDataArray = [],
        newPage = {},
        blockName,
        pageName = Object.keys(page)[0],
        blockNames = Object.keys(page[pageName].blocks),
        key,
        length = Object.keys(page[pageName].blocks).length;

    project.pages[pageName] = {
      blocks: {}
    };

    for(var i = 0; i < length; i ++) {
      blockName = blockNames[i];
      key = project._id + pageName + blockName;
      blockDataArray.push({
        key: key,
        content: page[pageName].blocks[blockName].content
      });

      project.pages[pageName].blocks[blockName] = {
        key: key
      };
    }
    return blockDataArray;
  };

  projectSchema.methods.getPage = function(pageName) {
    var _this = this;
    return Q.Promise(function(resolve, reject, notify) {
      if(!_this.pages[pageName]) {
        reject(new Error('Page does not exist!'));
      } else {
        return _this.pages[pageName];
      }
    });
  };

  projectSchema.statics.createProject = function(ajaxProject) {
    var _this = this;
    return Q.Promise(function(resolve, reject, notify) {
      var validateProject = validate.project(ajaxProject.name),
          Project = app.db.model('Project');

      if(!validateProject.valid) {
        reject(validateProject.error);
        return;
      }

      var newProject = new Project({
            name: ajaxProject.name,
            pages: {}
          });

      if(!ajaxProject.pages) {
        project.save(function(err) {
          if(err) {
            reject(err);
          } else {
            resolve(project);
          }
        });
        return;
      }

      var pageKeys = Object.keys(ajaxProject.pages);

      if(pageKeys.length == 0) {
        project.save(function(err) {
          if(err) {
            reject(err);
          } else {
            resolve(project);
          }
        });
        return;
      }

      // Make sure we build a clean project
      for(var i = 0; i < pageKeys.length; i ++) {
        var pageName = pageKeys[i];
        var validatePage = validate.page(pageName);
        
        if(!validatePage.valid) {
          continue;
        }

        var page = {};
        page[pageName] = ajaxProject.pages[pageName];

        project.createPage(page);
      }
      project.save(function(err) {
        if(err) {
          reject(err);
        } else {
          resolve(project._id);
        }
      });
      resolve(project);
    });
  };

  projectSchema.methods.createPage = function(ajaxPage) {
    var _this = this;
    return Q.Promise(function(resolve, reject, notify) {
      if(_this.pages[Object.keys(ajaxPage)[0]]) {
        reject(new Error('Page already exists'));
      } else {
        var dataBlockArray = processNewPage(_this, ajaxPage);
        console.log('ok creating page')
        aws.putBlocks(
          dataBlockArray,
          function _resolve() {
            _this.markModified('pages');
            _this.save(function(err) {
              if(err) {
                reject(err);
              } else {
                resolve();
              }
            });
          },
          reject
        );
      }
    });
  };

  // owner == username
  // project == projectName
  // page = pageName
  projectSchema.methods.deletePage = function(page) {
    var _this = this;
    return Q.Promise(function(resolve, reject, notify) {
      var blockKeys = [];
      _(_this.pages[page].blocks).forEach(function(block) {
        blockKeys.push(block.key);
      });
      aws.deleteBlocks(blockKeys, 
      function() {
        delete _this.pages[page];
        _this.markModified('pages');
        _this.save(function(err) {
          if(err) {
            reject(err);
          } else {
            resolve();
          }
        });
      },
      reject);
    });
  };

  // owner == username
  // project == projectName
  // page = pageName
  // block = blockInstance from client
  projectSchema.methods.putBlock = function(pageName, block) {
    var _this = this;
    return Q.Promise(function(resolve, reject, notify) {
      if(!_this.pages[pageName]) {
        reject(new Error('Page not found'));
      } else {
        var blockName = Object.keys(block)[0],
            dataBlock = {
              key: _this._id + pageName + blockName,
              content: block[blockName].content
            };

        aws.putBlocks(
          [dataBlock],
          function _resolve() {
            _this.pages[pageName].blocks[blockName] = {
              key: dataBlock.key
            };

            _this.markModified('pages');
            _this.save(function(err) {
              if(err) {
                reject(err);
              } else {
                resolve();
              }
            });
          },
          reject
        );
      }
    });
  };

  // owner == username
  // project == projectName
  // page = pageName
  // block = blockName
  projectSchema.methods.deleteBlock = function(pageName, blockName) {
    var _this = this;
    return Q.Promise(function(resolve, reject, notify) {
      if(!_this.pages[pageName]) {
        reject(new Error('Page not found'));
      } else if(!_this.pages[pageName].blocks[blockName]) {
        reject(new Error('Block not found'));
      } else {
        aws.deleteBlocks(
          [_this.pages[pageName].blocks[blockName].key],
          function _resolve() {
            delete _this.pages[pageName].blocks[blockName];
            _this.markModified('pages');
            _this.save(function(err) {
              if(err) {
                reject(err);
              } else {
                resolve();
              }
            });
          },
          reject
        );
      }
    });
  };

  app.db.model('Project', projectSchema);
};
