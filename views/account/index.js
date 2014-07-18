'use strict';

exports.init = function(req, res){
  //res.render('account/index');
  res.send(req.user);
};
