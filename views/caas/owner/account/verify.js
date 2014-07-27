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
  req.app.db.models.Account.findOne({_id: req.user.roles.account}, function(err, account) {
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
    if(billing.due - Date.now < 0 && !billing.paid && paymentPlan.plan != 'freetrial') {
      if(billing.overdue - Date.now < 0) {
        // if overdue by 30 days deactivate account
        if(billing.overdue - Date.now < -2592000000 ) {
          notifications[deactivated] = {
            due: due,
            penalty: penalty,
            interestIncurred: interestIncurred,
            totalDue: totalDue
          };
        } else {
          notifications[balanceOverdue] = {
            due: due,
            penalty: penalty,
            interestIncurred: interestIncurred,
            totalDue: totalDue,
            daysLeft: daysLeft
          };
        }
      } else {
        notifications[balanceDue] = {
          due: due,
          daysLeft: daysLeft
        };
      }
    }

    if(paymentPlan.plan == 'freetrial' && Date.now - billing.start > 20 days ) {
      if(Date.now - billing.start >  30 ) {
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