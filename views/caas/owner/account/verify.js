var moment = require('moment'),
    _ = require('lodash');

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

// exports.details = function(req, res) {
//   var notifications = {};
//   res.header("Content-Type", "application/json");
//   req.app.db.models.Account.findOne({_id: req.user.roles.account}).
//   populate('paymentPlan.plan').
//   exec(function(err, account) {
//     var billing = account.billing[account.billing.length - 1],
//         plan = account.paymentPlan[0],
//         totalMemory = 0;

//     if(err) {
//       res.status(500).send({
//         errors: [err],
//         errfor: {}
//       });

//       return;
//     }

//     if(account.isVerified != 'yes') {
//       notifications[verify] = 'no';
//       res.status(500).send({
//         errfor: {
//           isVerified: 'no'
//         }
//       })
//       return;
//     }

//     // balance
//     if(moment(billing.due).diff(moment()) < 0 && !billing.paid && plan.name != 'freetrial') {
//       if(moment(billing.overdue).diff(moment()) < 0) {
//         // if overdue by 30 days deactivate account
//         if(moment(billing.overdue).add('d',30).diff(moment()) < 0) {
//           notifications[deactivated] = {
//             due: moment(billing.overdue).add('d', 30).fromNow(),
//             cardStatus: billing.cardStatus,
//             baseCharge: billing.baseCharge,
//             penalty: billing.penalty,
//             interest: billing.interest,
//             gets: billing.gets,
//             puts: billing.puts,
//             memoryUsed: billing.memoryUsed,
//             amountDue: billing.amountDue,
//             amountPaid: billing.amountPaid
//           };
//         } else {
//           notifications[balanceOverdue] = {
//             due: moment(billing.overdue).add('d',30).fromNow(),
//             cardStatus: cardStatus,
//             baseCharge: baseCharge,
//             gets: billing.gets,
//             puts: billing.puts,
//             bandwidth: billing.bandwidth,
//             memoryUsed: billing.memoryUsed,
//             penalty: billing.penalty,
//             interest: billing.interest,
//             amountDue: billing.amountDue,
//             amountPaid: billing.amountPaid
//           };
//         }
//       } else {
//         notifications[balanceDue] = {
//           due: moment(billing.due).add('d', 30).fromNow(),
//           amountDue: billing.amountDue,
//           amountPaid: billing.amountPaid,
//           baseCharge: billing.baseCharge,
//           gets: billing.gets,
//           puts: billint.puts,
//           bandwidth: billing.bandwidth,
//           memoryUsed: billing.memoryUsed
//         };
//       }
//     }

//     var memoryUsed = 0;

//     _(account.projectStatistics).forEach(function(block) {
//       memoryUsed += block.currentBytes;
//     });

//     if(plan.name == 'freetrial' && moment(billing.start).add('d',20).diff(moment()) < 0 ) {
//       var thirtyDays = moment(billing.start).add('d', 30);
//       if(thirtyDays.diff(moment()) < 0) {
//         notifications[freetrialOver] = {
//           memoryUsed: memoryUsed
//         };
//       } else {
//         notifications[freetrialAlmostup] = {
//           daysLeft: thirtyDays.fromNow()
//         };
//       }
//     }

//     if(plan.memoryAlloted - memoryUsed < 50000000) {
//       notifications[storagelimit] = {
//         memoryAlloted: parseInt(plan.memoryAlloted / 1000000),
//         memoryUsed: parseInt(memoryUsed / 1000000)
//       };
//     }

//   });
//  };