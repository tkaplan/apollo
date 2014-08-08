var _ = require('lodash'),
    moment = require('moment'),
    email = require('../../../email/email');

exports.update = function(req, res) {
  var stripe = req.app.get('stripe');
  
  res.header('Content-Type', 'application/json');

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

exports.getOutstandingBills = function(req, res) {
  req.app.db.models.Account.findOne({search: [req.user.username]}, 'billing', function(err, account) {
    if(err) {
      res.status(400).send({
        errors: [err]
      });
    } else {
      res.status(200).send(account.calculateBill());
    }
  });
}

exports.pay = function(req, res) {
  res.header('Content-Type', 'application/json');
  
  var name = req.body.name,
      email = req.body.email;

  req.app.db.models.Account.findOne({search: [req.user.username]}, 'billing').
  exec(function(err, account) {

    var bills = account.calculateBill();

    if(bills.length == 0) {
      res.status(400).send('No bills found at this time.');
      return;
    }

    req.app.get('stripe').charges.create({
      amount: bills.totalDue,
      currency: 'usd',
      card: req.body.card.id,
      description: "One time payment towards monthly bill"
    }).then(
      function _resolve(charge) {
        if(charge.paid) {

          var card = charge.card;

          var amount = charge.amount,
              txn = charge.balance_transaction,
              last4 = card.last4,
              brand = card.brand;

          _.forEach(account.billing, function(bill) {
            // Also make sure that we are pass the due date
            if(bill.txn == '' && (moment().add(1, 'days').diff(bill.due) < 0)) {
              bill.txn = txn;
              bill.last4 = last4;
              bill.brand = brand;
            }
          });

          email.paymentConfirmation(req, res, bills, amount, txn, last4, brand);

          account.save(function(err) {
            if(err) {
              res.status(200).send({
                message: "Data base couldn't save",
                txn: txn,
                last4: amount,
                brand: brand
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