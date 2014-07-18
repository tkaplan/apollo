var config = require('../config'),
	options = {
		server: {poolSize: 20}
	},
    mongoose = require('mongoose'),
    app = {
      get: function(mode) {
        return "development";
      }
    };


app.db = mongoose.createConnection(config.mongodb.testUri, options);
app.db.on('error', console.error.bind(console, 'mongoose connection error: '));
app.db.once('open', function () {
  //and... we have a data store
});

exports.app = app;
exports.mongoose = mongoose;