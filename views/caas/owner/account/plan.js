exports.buy = function(req, res) {
  res.header('Content-Type', 'application/json');
  var plan = req.body.plan;
  var term = req.body.term;

  switch() {
    case 'Bronze':
    case 'Silver':
    case 'Gold':
    case 'Platinum':
    case 'Unlimited':
      break;
    default:
      res.status(400).send({
        errors: [
          new Error('Invalid payment plan');
        ]
      });
      return;
  }

  switch(term) {
    case 1:
    case 12:
    case 36:
      break;
    default:
      res.status(400).send({
        errors: [
          new Error('Invalid contract term');
        ]
      });
      return;
  }

  // Get and process credit card if plan and term is valid
  var stripe = req.app.get('stripe');

  stripe.customers.create({
    card: req.body.card.id
  }).then(
    function _resolve(customer) {
      app.db.models.Account.findOne({search: [req.user.username]}, function(err, account) {
        if(err || !account) {
          err = err ? err : new Error('No account found');
          res.status(400).send({
            errors: [err]
          });
        } else {
          // assign plan
          app.db.models.BillingPlan.findOne({name: plan}, function(err, billingPlan) {
            if(err) {
              res.status(400).send({
                errors: [err]
              });
            } else {
              account.buyPlan(customer.id, term, billingPlan).then(
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

  req.app.db.models.Account.findOne({search: [req.user.username]}).
  populate('paymentPlan.plan projectStatistics').
  exec(function(err, account) {
    if(wantedPaymentPlan.memoryAlloted < account.getTotalMemoryUsage &&
      wantedPaymentPlan.baseCharge < account.paymentPlan.baseCharge) {
      res.status(400).send({
        errors: [
          new Error('Cannot downgrade your plan, you must free up memory')
        ]
      })
    } else {
      switch(plan) {
        case 'Bronze':
        case 'Silver':
        case 'Gold':
        case 'Platinum':
        case 'Unilimited':
          account.defer('change-plan', plan).then(
            function() {
              res.status(204).send();
            },
            function(reason) {
              res.status(400).send({
                errors: [reason]
              });
            }
          );
          break;
        default:
          res.stats(400).send({
            errors: [
              new Error('Plan does not exist');
            ]
          });
      }
    }
  });
}

// Cancels monthly automatic renewal
exports.cancel = function(req, res) {
  res.header('Content-Type', 'application/json');

  req.app.db.models.Account.findOne({search: [req.user.username]}).
  populate('paymentPlan').
  exec(function(err, account) {
    if(account.paymentPlan.contractTerm === 'month') {
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
  });
  // If plan is monthly then you can cancel
    // Add defer cancel plan to account
  // Else
    // reject
}