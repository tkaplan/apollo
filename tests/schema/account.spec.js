
var app = require('../db-mock').app,
    Q = require('q'),
    id,
    Account,
    moment = require('moment'),
    mongoose = require('../db-mock').mongoose;

describe("Account", function() {
  before(function(done) {
    require('../../schema/Account')(app,mongoose);
    require('../../schema/BillingPlan')(app,mongoose);
    Account = app.db.model('Account');
    account = new Account({
      name: {
        first: "Taylor",
        middle: "Seymour",
        last: "Kaplan",
        full: "Taylor Seymour Kaplan"
      },
      company: "Apollo INC."
    });

    account.save(function(err, account) {
      id = account._id;
      account.projectStatistics = {};
      account.markModified('projectStatistics');
      account.save(function(err, account) {
        done();
      });
    });
  });

  it("Should get me my date", function(done) {
    Account.findOne({'name.first': 'Taylor'}, function(err, account) {
      done();
    })
  });

  it.skip("Should allow me to search for my account", function(done) {
    Account.findOne({'name.first': 'Taylor'}, function(err, account) {
      account.projectStatistics['hello'] = {
        currentBytes: 512,
        bytesTransfered: 0,
        gets: 0,
        puts: 0
      };
      account.markModified('projectStatistics');
      account.save(function(err) {
        done();
      });
    });
  });

  it.skip("Should allow me to increment my gets by one", function(done) {
    Account.findOne({'name.last': 'Kaplan'}, function(err, account) {
      account.incrementGet('hello').then(
        function() {
          console.log(account);
          done();
        },
        function(err) {
          console.log(err);
          done();
        }
      );
    });
  });

  it.skip("Should allow me to increment my puts by one", function(done) {
    Account.findOne({'name.last': 'Kaplan'}, function(err, account) {
      account.incrementPut('hello','some bullshit content').then(
        function() {
          console.log(account);
          done();
        },
        function(err) {
          console.log(err);
          done();
        }
      );
    });
  });

  it.skip("Should allow me to increment my gets by one", function(done) {
    Account.findOne({'name.last': 'Kaplan'}, function(err, account) {
      account.incrementGet('hello').then(
        function() {
          console.log(account);
          done();
        },
        function(err) {
          console.log(err);
          done();
        }
      );
    });
  });

  it.skip("Should allow me to increment my gets by one", function(done) {
    Account.findOne({'name.last': 'Kaplan'}, function(err, account) {
      account.resetStats('hello').then(
        function() {
          console.log(account);
          done();
        },
        function(err) {
          console.log(err);
          done();
        }
      );
    });
  });

  after(function(done) {
    Account.findByIdAndRemove(id, function(err) {
      done();
    });
  });

});
