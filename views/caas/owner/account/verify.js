var moment = require('moment'),
    _ = require('_');

exports.verify = function(req, res) {
  res.header("Content-Type", "application/json");
  req.app.db.models.Account.findOne({_id: req.user.roles.account}, function(err, account) {
    if(err) {
      res.status(500).send({
        errors: [err],
        errfor: {},
        notices: {}
      });
    }
    if(account.isVerified === 'yes') {
      res.status(200).send({
        isVerified: 'yes'
      });
    } else {
      res.status(200).send({
        isVerified: 'no'
      });
    }
  });
};

exports.details = function(req, res) {
  var notifications = {};
  res.header("Content-Type", "application/json");
  req.app.db.models.Account.findOne({_id: req.user.roles.account}).
  populate('paymentPlan.plan').
  exec(function(err, account) {
    var billing = account.billing[account.billing.length - 1],
        paymentPlan = account.paymentPlan[0],
        totalMemory = 0;

    if(err) {
      res.status(500).send({
        errors: [err],
        errfor: {}
      });

      return;
    }

    if(account.isVerified != 'yes') {
      notifications[verify] = 'no';
      res.status(500).send({
        errfor: {
          isVerified: 'no'
        }
      })
      return;
    }

    // balance
    if(moment(billing.due).diff(moment()) < 0 && !billing.paid && paymentPlan.plan != 'freetrial') {
      if(moment(billing.overdue).diff(moment()) < 0) {
        // if overdue by 30 days deactivate account
        if(moment(billing.overdue).add('d',30).diff(moment()) < 0) {
          notifications[deactivated] = {
            dueDate: moment(billing.overdue).add('d', 30).fromNow(),
            cardStatus: cardStatus,
            baseCharge: baseCharge,
            penalty: penalty,
            interestIncurred: interestIncurred,
            amountDue: totalDue
          };
        } else {
          notifications[balanceOverdue] = {
            dueDate: moment(billing.overdue).add('d',30).fromNow(),
            cardStatus: cardStatus,
            baseCharge: baseCharge,
            gets: billing.gets,
            puts: billing.puts,
            bandwidth: billing.bandwidth,
            memoryUsed: billing.memoryUsed,
            penalty: penalty,
            interestIncurred: interestIncurred,
            totalDue: totalDue,
            amountDue: billing.amountDue 
          };
        }
      } else {
        notifications[balanceDue] = {
          dueDate: moment(billing.due).add('d', 30).fromNow(),
          amountDue: billing.amountDue,
          baseCharge: billing.baseCharge,
          gets: billing.gets,
          puts: billint.puts,
          bandwidth: billing.bandwidth,
          memoryUsed: billing.memoryUsed
        };
      }
    }

    if(paymentPlan.name == 'freetrial' && moment(billing.start).add('d',20).diff(moment()) < 0 ) {
      if(moment(billing.start).add('d', 30).diff(moment()) < 0) {
        notifications[freetrialOver] = {
          memoryUsed: memoryUsed,
          gets: gets,
          puts: puts,
          bandwidth: bandwidth,
          planRecommend: planRecommend
        };
      } else {
        notifications[freetrialAlmostup] = {
          daysLeft: daysLeft
        };
      }
    }

    _(account.projectStatistics).forEach(function(block) {
      totalMemory += block.currentBytes;
    });

    if(planGB - totalMemory < 50MB) {
      notifications[storagelimit] = {
        allowed: allowed,
        used: used
      };
    }

  });
};