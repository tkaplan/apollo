exports.verify = function(req, res) {
  res.header("Content-Type", "application/json");
  req.app.db.models.Account.findOne({_id: req.user.roles.account}, function(err, account) {
    if(err) {
      res.status(500).send({
        errors: [err]
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