// Notice Codes
var Code = {};
  Code['000'] = "Your free trial is almost up. You have %days% left to sign up. You may check bellow to stop recieving notices.";
  Code['001'] = "Your free trial is up. To enable content editing and allow your\
          clients content access, please sign up for a plan.";
  Code['002'] = "You are approaching you storage limit of %limit%. You are currently\
          using %usage% GB's of your plan. You can either:\
            1) Free up storage by squashing your commits\
            2) Free up storage by deleting content\
            3) Or upgrade your plan\
          To stop recieving this notice please check the box bellow.";
  Code['003'] = "Your account is overdue. You have %days% before service interruption with\
          incurred late fees. Unpaid accounts by this time will result in:\
            1) Denied access to content editing\
            2) Denied get requests for clients to content\
          \
          If this is a mistake please send message bellow";
  Code['004'] = "Your account is overdue by 2 weeks for an amount of %owed%. Please pay your balance\
          to renable content access and editing privileges.";
  Code['005'] = "Your account has not been verified. Please verify your account to start your free 2 week trial.";
  Code['006'] = "Welcome new user! If you want to go through a tutorial please click here:\
          otherwise you may check this to stop receiving this notice."

exports.notice = function(req, res) {

  var user = req.user,
      notices = {},
      now = new Date()).now();

  if(user.account.isVerified === 'no') {
    notices['005'] = Code['005'];
  } else {
    if(
        now - user.account.userCreate.time =< config.trialTime &&
        user.acount.plan === null &&
        user.account.notify.freeTrial
      ) {
      notices['000'] = Code['000'];
    }
    
    if(
        now - user.account.userCreate.time > config.trialTime) &&
        user.account.plan === null
      ) {
      notices['001'] = Code['001'];
    }

    // With in 50 MB's
    if(
        user.account.plan.storageLimit - user.account.plan.storageUsed < 50 &&
        user.account.notify.storageLimit
      ) {
      notices['002'] = Code['002'];
    }

    if(
        user.account.balance.owed > 0  &&
        now - user.account.balance.due > config.paymentPeriod &&
        now - user.account.balance.due =< config.due
      ) {
      notices['003'] = Code['003'];
    }

    if(
        user.account.balance.owed > 0 &&
        now - user.account.balance.due > config.due 
      ) {
      notices['004'] = Code['004'];
    }

    if(user.account.notify.newUserNotice) {
      notices['006'] = Code['006'];
    }
  }

};
