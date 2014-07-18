exports.verify = function(req, res) {
  console.log(req.user.roles.account.isVerified);
  res.status(204).send();
};