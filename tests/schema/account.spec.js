var app = require('../db-mock').app,
    Q = require('q'),
    should = require('should'),
    accountId,
    Account,
    User,
    user,
    userId,
    async = require('async'),
    moment = require('moment'),
    mongoose = require('../db-mock').mongoose;

describe("Account", function() {
  before(function(done) {
    require('../../schema/Account')(app,mongoose);
    require('../../schema/BillingPlan')(app,mongoose);
    require('../../schema/User')(app,mongoose);

    // Create our fake account
    Account = app.db.model('Account');
    account = new Account({
      name: {
        first: "Taylor",
        middle: "Seymour",
        last: "Kaplan",
        full: "Taylor Seymour Kaplan"
      },
      company: "Apollo INC.",
      search: ["taylor"]
    });

    // Create our fake user
    User = app.db.model('User');
    user = new User({
      username: 'taylor',
      password: 'password',
      email: 'taylor@apollo.com',
      roles: {
        account: null
      },
      userCreated: {},
      projects: []
    });

    // Create our billing plans
    require('../billing-config-mock.js').
    billingPlanFixtures(app.db.model('BillingPlan'));

    // Create our associations
    account.save(function(err, account) {
      accountId = account._id;
      account.projectStatistics = {};
      account.markModified('projectStatistics');
      account.save(function(err, account) {
        user.roles.account = account;
        user.save(function(err, user) {
          account.userCreated.id = user._id;
          userId = user._id;
          account.name = user.username;
          account.save(function(err, account) {
            done();
          });
        });
      });
    });
  });  

  it("Should allow me to search for my account", function(done) {
    Account.findOne({search: ['taylor']}, function(err, account) {
      account.projectStatistics['hello'] = {
        currentBytes: 512,
        bytesTransfered: 0,
        gets: 0,
        puts: 0
      };
      account.projectStatistics['nope'] = {
        currentBytes: 100,
        bytesTransfered: 100,
        gets: 1,
        puts: 0
      };
      account.markModified('projectStatistics');
      account.save(function(err, account) {
        account.projectStatistics['hello'].currentBytes.should.equal(512);
        account.paymentPlan.length.should.match(1);
        done();
      });
    });
  });

  it("should allow me to query and populate for my plan", function(done) {
    Account.findOne({search: ['taylor']}, 'projectStatistics', function(err, account) {
      account.incrementGet('hello').then(
        function() {
          account.projectStatistics['hello'].gets.should.equal(1);
          account.projectStatistics['hello'].bytesTransfered.should.equal(512);
          done();
        },
        function(err) {
          should.fail(err);
          done();
        }
      );
    });
  });

  it("Should allow me to increment my gets by one", function(done) {
    Account.findOne({search: ['taylor']}, function(err, account) {
      account.incrementGet('hello').then(
        function() {
          account.projectStatistics['hello'].gets.should.equal(2);
          account.projectStatistics['hello'].bytesTransfered.should.equal(1024);
          done();
        },
        function(err) {
          done();
        }
      );
    });
  });

  it("Should allow me to increment my puts by one", function(done) {
    Account.findOne({search: ['taylor']}, function(err, account) {
      account.incrementPut('hello','some bullshit content').then(
        function() {
          account.projectStatistics['hello'].gets.should.equal(2);
          account.projectStatistics['hello'].puts.should.equal(1);
          account.projectStatistics['hello'].bytesTransfered.should.equal(1024);
          account.projectStatistics['hello'].currentBytes.should.equal(21);
          done();
        },
        function(err) {
          should.fail(err);
          done();
        }
      );
    });
  });

  it("Should allow me to increment my gets by one", function(done) {
    Account.findOne({search: ['taylor']}, function(err, account) {
      account.incrementGet('hello').then(
        function() {
          account.projectStatistics['hello'].gets.should.equal(3);
          account.projectStatistics['hello'].puts.should.equal(1);
          account.projectStatistics['hello'].bytesTransfered.should.equal(1045);
          account.projectStatistics['hello'].currentBytes.should.equal(21);
          done();
        },
        function(err) {
          should.fail(err);
          done();
        }
      );
    });
  });

  it("Should allow me to get total bytesTransfered", function() {
    Account.findOne({search: ['taylor']}, function(err, account) {
      account.getTotalBytesTransfered().should.equal(1145);
    });
  });

  it("Should allow me to get total bytesTransfered", function() {
    Account.findOne({search: ['taylor']}, function(err, account) {
      account.getTotalMemoryUsage().should.equal(121);
    });
  });

  it("Should allow me to increment my gets by one", function(done) {
    Account.findOne({search: ['taylor']}, function(err, account) {
      account.resetStats('hello').then(
        function() {
          account.projectStatistics['hello'].gets.should.equal(0);
          account.projectStatistics['hello'].puts.should.equal(0);
          account.projectStatistics['hello'].bytesTransfered.should.equal(0);
          account.projectStatistics['hello'].currentBytes.should.equal(21);
          account.projectStatistics['nope'].gets.should.equal(0);
          account.projectStatistics['nope'].puts.should.equal(0);
          account.projectStatistics['nope'].bytesTransfered.should.equal(0);
          account.projectStatistics['nope'].currentBytes.should.equal(100);
          done();
        },
        function(err) {
          should.fail(err);
          done();
        }
      );
    });
  });

  it("Should allow me to buy a plan", function(done) {
    Account.findOne({search: ['taylor']}, function(err, account) {
      account.buyPlan('123', 12, 'Platinum').then(
        function(account) {
          var pp = account.paymentPlan;
          pp[0].contractTerm.should.match(12);
          pp.length.should.match(1);
          account.card.should.match(123);
          account.getBillingPlan().then(
            function(billingPlan) {
              billingPlan.name.should.equal('Platinum');
              done();
            },
            function(err) {
              should.fail(err);
              done();
            }
          );
        },
        function(err) {
          should.fail(err);
          done();
        }
      );
    });
  });

  it("Should allow me to place a defer", function(done) {
    Account.findOne({search: ['taylor']}, function(err, account) {
      account.defer('test-defer', {
        key1: 'value1',
        key2: 'value2'
      }).then(
        function(account) {
          var defer = account.defers[0];
          defer.type.should.match('test-defer');
          defer.params.key1.should.match('value1');
          defer.params.key2.should.match('value2');
          done();
        },
        function(err) {
          done();
        }
      );
    });
  });

  it("Should allow me to change a plan", function(done) {
    Account.findOne({search: ['taylor']}, function(err, account) {
      account.changePlan('made up').then(
        function(account) {
          should.fail('should not have passed');
          done();
        },
        function(err) {
          err.toString().should.match('Error: Billing Plan Does Not Exists!');
          done();
        }
      );
    });
  });

  it("Should allow me to change a plan", function(done) {
    Account.findOne({search: ['taylor']}, function(err, account) {
      account.changePlan('Freetrial').then(
        function(account) {
          should.fail('should not have passed');
          done();
        },
        function(err) {
          err.toString().should.match('Error: You cannot get another free trial!');
          done();
        }
      );
    });
  });

  it("Should allow me to change a plan: Platinum", function(done) {
    Account.findOne({search: ['taylor']}).
    populate('paymentPlan.plan').
    exec(function(err, account) {
      account.changePlan('Platinum').then(
        function(account) {
          var defer = account.defers[1];
          defer.type.should.match('change-plan');
          defer.params.should.match('Platinum');
          done();
        },
        function(err) {
          should.fail(err);
          done();
        }
      );
    });
  });

  it("Should allow me to increment my puts by one", function(done) {
    Account.findOne({search: ['taylor']}, function(err, account) {
      var bigString = '';

      for(var i = 0; i < 100; i ++) {
        bigString += 'aaaaaaaaaaaaaaaaaaaaaaaaa';
      }
      account.incrementPut('hello', bigString).then(
        function(account) {
          account.projectStatistics['hello'].gets.should.equal(0);
          account.projectStatistics['hello'].puts.should.equal(1);
          account.projectStatistics['hello'].bytesTransfered.should.equal(0);
          account.projectStatistics['hello'].currentBytes.should.equal(2500);
          done();
        },
        function(err) {
          should.fail(err);
          done();
        }
      );
    });
  });

  it("Should allow me to change a plan", function(done) {
    Account.findOne({search: ['taylor']}).
    populate('paymentPlan.plan').
    exec(function(err, account) {
      account.changePlan('Bronze').then(
        function(account) {
          should.fail('should not have passed');
          done();
        },
        function(err) {
          err.toString().should.match('Error: Cannot downgrade your plan, you must free up memory.');
          done();
        }
      );
    });
  });

  it("Should allow me to update card", function(done) {
    Account.findOne({search: ['taylor']}).
    exec(function(err, account) {
      account.card.should.match(123);
      account.updateCard('234').then(
        function(account) {
          account.card.should.match(234);
          done();
        },
        function(err) {
          should.fail(err);
          done();
        }
      );
    });
  });

  it("Should not have any kind of race conditions when incrementing get", function(done) {
    Account.findOne({search: ['taylor']}).
    exec(function(err, account) {
      console.log(account.projectStatistics['hello'].gets);
      async.parallel([
          function(callback) {
            account.incrementGet('hello').then(callback);
          },
          function(callback) {
            account.incrementGet('hello').then(callback);
          },
          function(callback) {
            account.incrementGet('hello').then(callback);
          },
          function(callback) {
            account.incrementGet('hello').then(callback);
          },
          function(callback) {
            account.incrementGet('hello').then(callback);
          },function(callback) {
            account.incrementGet('hello').then(callback);
          },
          function(callback) {
            account.incrementGet('hello').then(callback);
          },
          function(callback) {
            account.incrementGet('hello').then(callback);
          },
          function(callback) {
            account.incrementGet('hello').then(callback);
          },
          function(callback) {
            account.incrementGet('hello').then(callback);
          },
          function(callback) {
            account.incrementGet('hello').then(callback);
          },
          function(callback) {
            account.incrementGet('hello').then(callback);
          },
          function(callback) {
            account.incrementGet('hello').then(callback);
          },
          function(callback) {
            account.incrementGet('hello').then(callback);
          },
          function(callback) {
            account.incrementGet('hello').then(callback);
          },function(callback) {
            account.incrementGet('hello').then(callback);
          },
          function(callback) {
            account.incrementGet('hello').then(callback);
          },
          function(callback) {
            account.incrementGet('hello').then(callback);
          },
          function(callback) {
            account.incrementGet('hello').then(callback);
          },
          function(callback) {
            account.incrementGet('hello').then(callback);
          }
        ],
        function(err, results) {
          account.projectStatistics['hello'].gets.should.match(20);
          done();
        }
      );
    });
  });

it("Should not have any kind of race conditions when incrementing get", function(done) {
    Account.findOne({search: ['taylor']}).
    exec(function(err, account) {
      console.log(account.projectStatistics['hello'].gets);
      async.parallel([
          function(callback) {
            account.incrementPut('hello','h').then(callback);
          },
          function(callback) {
            account.incrementPut('hello','h').then(callback);
          },
          function(callback) {
            account.incrementPut('hello','h').then(callback);
          },
          function(callback) {
            account.incrementPut('hello','h').then(callback);
          },
          function(callback) {
            account.incrementGet('hello','h').then(callback);
          },function(callback) {
            account.incrementPut('hello','h').then(callback);
          },
          function(callback) {
            account.incrementPut('hello','h').then(callback);
          },
          function(callback) {
            account.incrementPut('hello','h').then(callback);
          },
          function(callback) {
            account.incrementPut('hello','h').then(callback);
          },
          function(callback) {
            account.incrementPut('hello','h').then(callback);
          },
          function(callback) {
            account.incrementPut('hello','h').then(callback);
          },
          function(callback) {
            account.incrementPut('hello','h').then(callback);
          },
          function(callback) {
            account.incrementPut('hello','h').then(callback);
          },
          function(callback) {
            account.incrementPut('hello','h').then(callback);
          },
          function(callback) {
            account.incrementPut('hello','h').then(callback);
          },function(callback) {
            account.incrementPut('hello','h').then(callback);
          },
          function(callback) {
            account.incrementPut('hello','h').then(callback);
          },
          function(callback) {
            account.incrementPut('hello','h').then(callback);
          },
          function(callback) {
            account.incrementPut('hello','h').then(callback);
          },
          function(callback) {
            account.incrementPut('hello','h').then(callback);
          }
        ],
        function(err, results) {
          account.projectStatistics['hello'].puts.should.match(20);
          done();
        }
      );
    });
  });

  after(function(done) {
    Account.findByIdAndRemove(accountId, function(err) {
      User.findByIdAndRemove(userId, function(err) {
        done();
      });
    });
  });

});
