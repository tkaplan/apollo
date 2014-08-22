var _ = require('lodash');
    async = require('async');

exports.add = function(req, res) {
  res.header('Content-Type', 'application/json');

  var project = req.params.project,
      owner = req.params.owner,
      editor = req.params.editor;

  // Only the owner can add an editor
  if(owner !== req.user.username) {
    res.status(400).send(JSON.stringify({
      errors: [new Error('Only the owner of this account can add editors')]
    }));
    return;
  }

  // Check that the editor does not equal owner
  if(owner === editor) {
    res.status(400).send(JSON.stringify({
      errors: [new Error('The owner cannot be added as an editor')]
    }));
    return;
  }

  req.app.db.models.Project.getProject(owner, project).then(
    function(project) {
      // Does the project exists?
      if(!project) {
        res.status(400).send(JSON.stringify({
          errors: ['Project does not exists']
        }));
      } else {
        // Does our user exist
        req.app.db.models.User.findOne({username: editor}).
        exec(function(err, user) {
          if(err || !user) {
            err = err ? err : new Error('User does not exist');
            res.status(400).send(JSON.stringify({
              errors: [err.toString()]
            }));
          } else {
            // Now that we have the user, we must insure
            // that the user is not already an editor
            var equals = _.filter(project.editors, function(editor) {
              return editor.toString() === user.id.toString();
            });

            if(equals.length > 0) {
              res.status(400).send(JSON.stringify({
                errors: ['The user is already an editor']
              }));
            } else {
              user.projects.push(project);
              project.editors.push(user);
              user.markModified('editors');
              user.markModified('projects');
              async.parallel([
                function(cb) {
                  user.save(function(err) {
                    cb(err);
                  });
                },
                function(cb) {
                  project.save(function(err) {
                    cb(err);
                  })
                }
              ],
              function(err) {
                if(err) {
                  res.status(400).send(JSON.stringify({
                    errors: [err.toString()]
                  }));
                } else {
                  res.status(204).send();
                }
              });
            }
          }
        })
      }
    },
    function(reason) {
      res.status(400).send({
        errors: [reason]
      });
    }
  );
};

exports.list = function(req, res) {
  res.header('Content-Type', 'application/json');

  var project = req.params.project,
      owner = req.params.owner,
      editors = [];

  // Only allow people to get editors for their own project
  if(req.user.username !== owner) {
    res.status(401).send(JSON.stringify({
      errors: [new Error('You can only list editors for your own project')]
    }));
    return;
  }

  req.app.db.models.Project.findOne({name: project, owner: req.user._id}).
  populate('editors').
  select('editors').
  exec(function(err, project) {
    if(err) {
      res.status(400).send(JSON.stringify({
        errors: [err]
      }));
    } else {
      _.forEach(project.editors, function(editor) {
        editors.push({
          email: editor.email,
          username: editor.username
        });
      });
      res.status(200).send(JSON.stringify({'editors':editors}));
    }
  });
};

exports.remove = function(req, res) {
  res.header('Content-Type', 'application/json');

  var project = req.params.project,
      owner = req.params.owner,
      editor = req.params.editor;

  // Only the owner can add an editor
  if(owner !== req.user.username) {
    res.status(400).send(JSON.stringify({
      errors: [new Error('Only the owner of this account can remove editors')]
    }));
    return;
  }

  req.app.db.models.Project.getProject(owner, project).then(
    function(project) {
      // Does the project exists?
      if(!project) {
        res.status(400).send(JSON.stringify({
          errors: [new Error('Project does not exists')]
        }));
      } else {
        // Does our user exist
        req.app.db.models.User.findOne({username: editor}).
        exec(function(err, user) {
          if(err || !user) {
            err = err ? err : new Error('User does not exist');
            res.status(400).send(JSON.stringify({
              errors: [err]
            }));
          } else {
            // Now that we have the user, we must insure
            // that the user is in the editor
            var equals = _.filter(project.editors, function(editor) {
              return editor.toString() === user.id.toString();
            });

            if(equals.length < 1) {
              res.status(400).send(JSON.stringify({
                errors: [new Error('The user is not an editor')]
              }));
            } else {

              // Find index reference in projects
              var projectIndex = _.findIndex(user.projects, function(projectRef) {
                return projectRef.toString() === project.id; 
              });

              // Find index reference in editors
              var userIndex = _.findIndex(project.editors, function(userRef) {
                return userRef.toString() === user.id;
              });

              // If the references are missing we are in deep shit
              if(userIndex < 0 || projectIndex < 0) {
                res.status(400).send(JSON.stringify({
                  errors: [new Error('Reference is missing')]
                }));
              }

              user.projects.splice(projectIndex, 1);
              project.editors.splice(userIndex, 1);

              user.markModified('editors');
              user.markModified('projects');
              async.parallel([
                function(cb) {
                  user.save(function(err) {
                    cb(err);
                  });
                },
                function(cb) {
                  project.save(function(err) {
                    cb(err);
                  })
                }
              ],
              function(err) {
                if(err) {
                  res.status(400).send(JSON.stringify({
                    errors: [err]
                  }));
                } else {
                  res.status(204).send();
                }
              });
            }
          }
        })
      }
    },
    function(reason) {
      res.status(400).send({
        errors: [reason]
      });
    }
  );
};