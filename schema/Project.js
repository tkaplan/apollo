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
        reject(new Error('No page found'));
      } else {
        return _this.pages[pageName];
      }
    });
  };

  projectSchema.methods.getPageContent = function(pageName) {
    var _this = this;
    return Q.Promise(function(resolve, reject, notify) {
      if(!_this.pages[pageName]) {
        reject(new Error('No page found'));
      } else {

        aws.getBlocks(_this.pages[pageName],
          function(pageContent) {
            resolve(pageContent);
          },
          function(reason) {
            reject(reason);
          }
        );
                  
      }
    });
  }

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
            // TODO: save block metadata in account stats
            // before deleting
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

  projectSchema.statics.tree = function(projects) {
    var _this = this;
    var tree = [];
    var map = function(projectId, callback) {
      app.db.models.Project.findById(projectId).
      populate('owner').
      exec(function(err, projectInst) {
        if(err) {
          callback(err);
        } else {
          var user = _.find(tree, function(owner) {
                return projectInst.owner.username
              }),
              project = {
                type: 'Project',
                value: projectInst.name,
                path: "/caas/owner/" + projectInst.owner.username + "/project/" + projectInst.name,
                children: []
              },
              pages = [],
              blocks = [],
              pageKeys = Object.keys(projectInst.pages);

          // Add all pages to project
          for(var i = 0; i < pageKeys.length; i ++) {
            var page = {
              type: 'Page',
              value: pageKeys[i],
              path: project.path + '/page/' + pageKeys[i],
              children: []
            }
            var blockKeys = Object.keys(projectInst.pages[pageKeys[i]].blocks);
            for(var j = 0; j < blockKeys.length; j ++) {
              var block = {
                type: 'Block',
                value: blockKeys[j],
                path: page.path + '/block/' + blockKeys[j]
              };
              page.children.push(block);
            }
            project.children.push(page);
          }

          // Add pages to tree project
          if(!user) {
            user = {
              type: 'Owner',
              value: projectInst.owner.username,
              children: []
            };

            tree.push(user);
          }

          // At this point we're done
          user.children.push(project);
          callback();
        }
      });
    };

    return Q.Promise(function(resolve, reject, notify) {
      // async in parallel get projects
      async.map(projects, map, function(err, results) {
        if(err) {
          reject(err);
        } else {
          resolve({tree:tree});
        }
      });
    });
  };

  projectSchema.statics.getProject = function(ownerName, projectName) {
    var _this = this;
    return Q.Promise(function(resolve, reject, notify) {
      app.db.models.User.findOne({'username': ownerName}).
      select('_id').
      exec(function(err, user) {
        if(err) {
          reject(err);
        } else {
          app.db.models.Project.findOne({'name': projectName, 'owner': user._id}).
          exec(function(err, project) {
            if(err) {
              reject(err);
            } else {
              resolve(project);
            }
          });
        }
      });
    });
  }

  app.db.model('Project', projectSchema);
};
