var business = require('../../../../business_rules/notices-blockers'),
    _ = require('lodash');

exports.notices = function(req, res) {
  res.header('Content-Type', 'application/json');
  var projectName = req.body.project,
      ownerName = req.body.owner;

  req.app.db.models.User.findOne({username: req.user.username}).
  populate('projects').
  exec(function(err, user) {
    if(err) {
      res.status(400).send(
        JSON.stringify({
          errors: [err.toString()]
        })
      );
    } else {
      req.app.db.models.Account.
      findById(user.roles.account).
      populate('paymentPlan.plan').
      exec(function(err, account) {
        if(err) {
          res.status(400).send(JSON.stringify(
            {
              errors: [err.toString()]
            }
          ));
        } else {
          req.app.db.models.Project.getProject(ownerName, projectName).then(
            function(project) {
              res.status(200).send(
                JSON.stringify({
                  notices: business(user, account, project)
                })
              );
            },
            function(reason) {
              res.status(400).send(
                JSON.stringify({
                  errors: [reason.toString()]
                })
              );
            }
          );
        }
      });
    }
  });
}