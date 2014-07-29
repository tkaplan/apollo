var config = require('../config'),
	options = {
		server: {poolSize: 20}
	},
    mongoose = require('mongoose'),
    app = {
      get: function(mode) {
        switch(mode) {
          case 'env':
            return "development";
          case 'stripeSK':
            return 'sk_test_4Tw8TRE9Js4fAHUFIkizjXah';
          case 'stripePK':
            return 'pk_test_4Tw8iV5onKraKG9SZJjrdS4Z';
        }
      }
    };

app.db = mongoose.createConnection(config.mongodb.testUri, options);
app.db.on('error', console.error.bind(console, 'mongoose connection error: '));
app.db.once('open', function () {
  //and... we have a data store
});

exports.app = app;
exports.mongoose = mongoose;