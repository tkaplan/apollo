var cookie = require('cookie');
var config = require('./config');
var signature = require('cookie-signature');

module.exports = function session(req, apCookie, next) {
  // expose store
  var cookieId;
  var store = req.app.sessionStore;
  req.sessionStore = store;


  // get the session ID from the cookie
  try {
    cookieId = req.sessionID = getcookie(apCookie, 'connect.sid', config.cryptoKey);
  } catch(err) {
    next(err);
    return;
  }

  store.get(req.sessionID, function(err, sess){
    // error handling
    if (err) {
      next(err);
    } else if (!sess) {
      next(new Error('no session found'));
    } else {
      next(null, sess);
    }
  });
};


/**
 * Get the session ID cookie from request.
 *
 * @return {string}
 * @api private
 */

function getcookie(apCookie, name, secret) {
  var raw;
  var val;

  // read from cookie header
  if (apCookie) {
    var cookies = cookie.parse(apCookie);

    raw = cookies[name];

    if (raw) {
      if (raw.substr(0, 2) === 's:') {
        val = signature.unsign(raw.slice(2), secret);

        if (val === false) {
          throw new Error('cookie signature invalid');
          val = undefined;
        }
      } else {
        throw new Error('cookie unsigned');
      }
    }
  }

  return val;
}