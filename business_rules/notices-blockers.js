var _ = require('lodash'),
    moment = require('moment');

// Require that req, account, and project be fully populated
module.exports = function(user, account, projectName) {
  var project = _.filter(user.projects, function(projectInst) {
        return projectName === projectInst.name;
      })[0];

  var notifications = {},
      planName = account.paymentPlan[0].plan.name,
      billsDue = _.filter(account.billing, function(bill) { 
        return moment().add(-1,'days').diff(bill.due) > 0
        && moment().add(-1,'days').diff(bill.overdue) < 0
        && bill.txn == '';
      }),
      billsOverdue = _.filter(account.billing, function(bill) { 
        return moment().add(-1,'days').diff(bill.overdue) > 0
        && bill.txn == '';
      });

  // Is balance due || Is balance overdue?
  if(billsOverdue.length > 0 &&
    planName != 'Freetrial' &&
    account.isVerified === 'yes') {

    notifications['overdue'] = {
      type: 'blocker',
      message: "Your account has been disabled and your customers cannot download your content"
    };
  } else if(billsDue.length > 0 && planName != 'Freetrial' && account.isVerified === 'yes') {
    notifications['due'] = {
      type: 'notification',
      message: "Either your credit card has not been charged or was denied. You balance is currently due."
    };
  }
  
  // Is freetrial within 5 days of finishing || freetrial over?
  if(planName === 'Freetrial' &&
    account.isVerified === 'yes') {
    
    var daysLeft = moment(account.billing[0].due).diff(moment(), 'days');
    if(daysLeft < 0) {
      notifications['freetrialDone'] = {
        type: 'blocker',
        message: "Your freetrial is up. To allow content access for your client please buy a plan."
      };
    } else if(daysLeft < 6) {
      notifications['freetrialAlmostDone'] = {
        type: 'notification',
        message: "Your freetrial is almost up. You have: " + daysLeft + " days left."
      };
    }
  }

  if(!project && account.isVerified === 'yes') {
    notifications['accessDenied'] = {
      type: 'blocker',
      message: "You are not an owner nor editor of this account. For access please contact the owner of this account."
    };
  }

  // Is account verified?
  if(account.isVerified !== 'yes') {
    notifications['verify'] = {
      type: 'blocker',
      message: "Please check your account for verification or re-send the verification email."
    };
  }

  return notifications;
}