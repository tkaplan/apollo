var _ = require('lodash');

exports.update = function(req, res) {
  var stripe = req.app.get('stripe');
  
  res.header('Content-Type', 'application/json');

  stripe.customers.create({
    card: req.body.card.id
  }).
  then(
    function _resolve(customer) {
      app.db.models.Account.findOne({search: [req.params.owner]}, function(err, account) {
        if(err || !account) {
          err = err ? err : new Error('No account found');
          res.status(400).send(
            errors: [err]
          );
        } else {
          account.updateCard(customer.id).then(
            function() {
              res.status(204).send();
            },
            function(reason) {
              res.status(400).send({
                errors: [reason]
              });
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
};

exports.pay = function(req, res) {
  req.app.db.models.Account.findOne({search: [req.params.owner]}, function(err, account) {

    // Get bill
    var bill = _.findIndex(account.billing, function(billing) {
      return billing.amountDue > 0;
    });

    // Send
    if(bill === -1) {
      res.status(204).send();
      return;
    }

    req.app.get('stripe').charges.create({
      amount: account.billing[bill].amountDue,
      currency: 'usd',
      card: req.body.card.id,
      description: "One time payment towards monthly bill"
    }).then(
      function _resolve(charge) {
        if(charge.paid) {
          account.billing[bill].amountDue = 0;
          account.billing[bill].balanceTransaction = charge.balance_transaction;
          account.save(function(err) {
            if(err) {
              res.status(200).send({
                message: "Data base couldn't save",
                balanceTX: charge.balance_transaction,
                ammountPaid: charge.amount
              });
            } else {
              res.status(204).send();
            }
          });
        } else {
          res.status(400).send({
            errors: [charge.failure_message]
          });
        }
      },
      function _reject(reason) {
        res.status(400).send({
          errors: [reason]
        });
      }
    );
  });

};