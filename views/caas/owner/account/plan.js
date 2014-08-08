exports.buy = function(req, res) {
  res.header('Content-Type', 'application/json');
  var plan = req.body.plan;
  var term = req.body.term;

  // Get and process credit card if plan and term is valid
  var stripe = req.app.get('stripe');

  stripe.customers.create({
    card: req.body.card.id
  }).then(
    function _resolve(customer) {
      req.app.db.models.Account.findOne({search: [req.user.username]}, function(err, account) {
        if(err || !account) {
          err = err ? err : new Error('No account found');
          res.status(400).send({
            errors: [err]
          });
        } else {
          // assign plan
          account.buyPlan(customer.id, term, plan).then(
            function() {
              res.status(204).send();
            },
            function(reason) {
              res.status(400).send({
                errors: [reason]
              })
            }
          );
        }
      });
    },
    function _reject(reason) {
      // Card is bad for some reason
      res.status(400).send({
        errors: [reason]
      })
    }
  );
}

// TODO: Finish and test function
exports.change = function(req, res) {
  res.header('Content-Type', 'application/json');
  var plan = req.body.plan,
      term = req.body.term;

  req.app.db.models.Account.findOne({search: [req.user.username]},
  'paymentPlan billing projectStatistics').
  populate('paymentPlan.plan').
  exec(function(err, account) {
    account.changePlan(plan, term).then(
      function(account) {
        res.status(204).send();
      },
      function(reason) {
        res.status(400).send({
          errors: [reason]
        });
      }
    );
  });
}

// Cancels monthly automatic renewal
exports.cancel = function(req, res) {
  res.header('Content-Type', 'application/json');

  req.app.db.models.Account.findOne({search: [req.user.username]}).
  populate('paymentPlan.plan').
  exec(function(err, account) {
    if(err) {
      res.status(400).send({
        errors: [err]
      });
    } else {
      if(account.paymentPlan.contractTerm == 1) {
        account.defer('cancel-monthly').then(
          function() {
            res.status(200).send({
              message: 'Success: your plan will not automatically renew'+
                       ' at the end of the month.'
            });
          },
          function(reason) {
            res.status(400).send({
              errors: [reason]
            });
          }
        )
      } else {
        res.status(200).send({
          message: 'You do not have a monthly plan.'+
          ' Your contract will not automatically renew '+
          'at the end of its term.'
        });
      }
    }
  });
};

exports.allowedBillingPlans = function(req, res) {
  res.header('Content-Type', 'application/json');
  req.app.db.models.Account.findOne({search: [req.user.username]}, 'paymentPlan billing').
  populate('paymentPlan.plan').
  exec(function(err, account) {
    if(err) {
      res.status(400).send({
        errors: [err]
      });
    } else {
      res.status(200).send(account.getAllowedBillingPlans());
    }
  });
}