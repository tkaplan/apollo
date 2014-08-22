exports.find = function(req, res) {
  var user = req.params.user;
  reg = new RegExp('^' + user + '.*');
  req.app.db.models.User.find({$or:[{'username': reg},{'email': reg}]}).
  select('username email').
  limit(10).
  exec(function(err, users) {
    if(err) {
      res.status(400).send({
        errors: [err.toString()]
      });
    } else {
      res.status(200).send(users);
    }
  });
};