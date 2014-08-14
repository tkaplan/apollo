'use strict';

var Q = require('q'),
    _ = require('lodash'),
    stripe = require('stripe'),
    moment = require('moment');

exports = module.exports = function(app, mongoose) {
  
  // Let this be our embedded doc
  // {
  //   key: {
  //     currentBytes: { type: Number },
  //     bytesTransfered: { type: Number },
  //     gets: { type: Number },
  //     puts: { type: Number }
  //   }, ...
  var spinlock = app.get('redis-spinlock');

  var billingSchema = new mongoose.Schema({
    start: { type: Date, default: moment()._d },
    due: { type: Date, default: moment().add('d', 30)._d },
    overdue: { type: Date, default: moment().add('d', 45)._d },
    amountDue: { type: Number, default: 0 },
    last4: { type: Number, default: 0 },
    brand: { type: String, default: null },
    txn: { type: String, default: '' },
    baseCharge: { type: Number, default: 0 },
    cardStatus: { type: String, default: '' },
    gets: { type: Number, default: 0 },
    puts: { type: Number, default: 0 },
    bandwidth: { type: Number, default: 0 },
    memoryUsed: { type: Number, default: 0 }
  });

  var paymentPlanSchema = new mongoose.Schema({
    contractTerm: { type: Number },
    plan: { type: mongoose.Schema.Types.ObjectId, ref: 'BillingPlan' }
  });

  var deferSchema = new mongoose.Schema({
    type: { type: String, default: '' },
    params: { type: mongoose.Schema.Types.Mixed },
    created: { type: Date, default: moment()._d }
  });

  var accountSchema = new mongoose.Schema({
    user: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      name: { type: String, default: '' }
    },
    isVerified: { type: String, default: '' },
    verificationToken: { type: String, default: '' },
    name: {
      first: { type: String, default: '' },
      middle: { type: String, default: '' },
      last: { type: String, default: '' },
      full: { type: String, default: '' }
    },
    company: { type: String, default: '' },
    phone: { type: String, default: '' },
    zip: { type: String, default: '' },
    status: {
      id: { type: String, ref: 'Status' },
      name: { type: String, default: '' },
      userCreated: {
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        name: { type: String, default: '' },
        time: { type: Date, default: Date.now }
      }
    },
    billing: [ billingSchema ],
    card: { type: String, default: '' },
    paymentPlan: [ paymentPlanSchema ],
    defers: [ deferSchema ],
    projectStatistics: mongoose.Schema.Types.Mixed,
    statusLog: [mongoose.modelSchemas.StatusLog],
    notes: [mongoose.modelSchemas.Note],
    userCreated: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      name: { type: String, default: '' },
      time: { type: Date, default: Date.now }
    },
    search: [String]
  });

  accountSchema.post('save', function(doc) {
    var _this = this;
    spinlock({keys: [_this.id]}).then(

      function(free) {
        if(!_this.billing){
          // Our lock on account
          free();
          return;
        }

        if(_this.billing.length == 0) {
          var BillingPlan = app.db.model('BillingPlan');
          BillingPlan.findOne({name: 'Freetrial'}, function(err, freetrial) {
            if(err) {
              // Do something at somepoint, but can't throw errors
              // Our lock on account
              free();
            } else {
              paymentPlanSchema.contractTerm = 1;
              paymentPlanSchema.plan = freetrial;
              // Add payment plan
              _this.paymentPlan.push(paymentPlanSchema);

              // Create billing statement
              _this.billing.push(billingSchema);

              _this.markModified('paymentPlan');
              _this.markModified('billing');

              _this.save(function(err) {
                if(err){
                  // Do something at some point but can't
                  // throw errors
                  // Our lock on account
                  free();
                } else {

                  free();
                } 
              });
            }
          });
        } else {

          // Our lock on account
          free();
        }
      },
      function() {}
    );
  });

  // TODO: test
  accountSchema.methods.buyPlan = function(card, term, plan) {
    var _this = this;

    _this.card = card;
    return Q.Promise(function(resolve, reject, notify) {
      app.db.models.BillingPlan.findOne({name: plan}, function(err, billingPlan) {
        if(err) {
          reject(err);
        } else {
          
          _this.paymentPlan = [];
          _this.paymentPlan.push(paymentPlanSchema);
          _this.paymentPlan[0].contractTerm = term;
          _this.paymentPlan[0].plan = billingPlan;
          _this.billing = [];
          _this.billing.push(billingSchema);
          _this.save(function(err, account) {
            if(err) {
              reject(err);
            } else {
              resolve(account);
            }
          });
        }
      });
    });
  };

  accountSchema.methods.getAllowedBillingPlans = function() {
    var _this = this,
        filter = {},
        allowedBillingPlans = {};

      filter.currentTerm = _this.paymentPlan[0].contractTerm;
      filter.currentMemoryUsage = _this.getTotalMemoryUsage();          
      switch(filter.currentTerm) {
        case 1:
          filter.currentBaseCharge = _this.paymentPlan[0].plan.baseChargeMonthly;
          break;
        case 12:
          filter.currentBaseCharge = _this.paymentPlan[0].plan.baseChargeYearly;
          break;
        case 36:
          filter.currentBaseCharge = _this.paymentPlan[0].plan.baseChargeThreeYear;
      }
      allowedBillingPlans.filter = filter;
      
      return allowedBillingPlans;
  };

  // Let this be our embedded doc
  // {
  //   key: {
  //     currentBytes: { type: Number },
  //     bytesTransfered: { type: Number },
  //     gets: { type: Number },
  //     puts: { type: Number }
  //   }, ...

  // var billingSchema = new mongoose.Schema({
  //   start: { type: Date, default: moment()._d },
  //   due: { type: Date, default: moment().add('d', 30)._d },
  //   overdue: { type: Date, default: moment().add('d', 60)._d },
  //   amountDue: { type: Number, default: 0 },
  //   balanceTransaction: { type: String, default: '' },
  //   baseCharge: { type: Number, default: 0 },
  //   cardStatus: { type: String, default: '' },
  //   gets: { type: Number, default: 0 },
  //   puts: { type: Number, default: 0 },
  //   bandwidth: { type: Number, default: 0 },
  //   memoryUsed: { type: Number, default: 0 },
  //   interest: { type: Number, default: 0 },
  //   penalty: { type: Number, default: 0 }
  // });

  // Requires paymentPlan, billing, and projectStatistics
  // to be loaded
  accountSchema.methods.calculateBill = function() {
    var outstandingBills = {
          bills: [],
          totalDue: 0
        };

    _.forEach(this.billing, function(bill) {
      if(bill.txn == '' && (moment().add(-1, 'days').diff(bill.due) > 0)) {
        outstandingBills.totalDue += bill.amountDue;
        outstandingBills.bills.push(bill);
        bill.baseCharge = bill.baseCharge.toFixed(2);
        bill.gets = bill.gets.toFixed(2);
        bill.puts = bill.puts.toFixed(2);
        bill.bandwidth = bill.bandwidth.toFixed(2);
        bill.memoryUsed = bill.memoryUsed.toFixed(2);
        bill.amountDue = bill.amountDue.toFixed(2);
      }
    });
    outstandingBills.totalDue = outstandingBills.totalDue.toFixed(2);
    return outstandingBills;
  };

  accountSchema.methods.updateBill = function() {
    var _this = this;

    return Q.Promise(function(resolve, reject, notify) {
      var plan = _this.paymentPlan[0].plan,
          bill = _.max(_this.billing, function(bill) {return bill.start}),
          totalStatistics = _this.getTotalStatistics();

      // Update the billing according to term
      switch(_this.paymentPlan[0].contractTerm) {
        case 1:
          bill.baseCharge += plan.baseChargeMonthly;
          bill.gets += plan.getRateMonthly * totalStatistics.totalGets;
          bill.puts += plan.putRateMonthly * totalStatistics.totalPuts;
          bill.memoryUsed += plan.memoryUseRateMonthly * (totalStatistics.totalMemoryUsage/10000000);
          bill.bandwidth += plan.bandwidthRateMonthly * (totalStatistics.totalBytesTransfered/10000000);
          break; 
        case 12:
          bill.baseCharge += plan.baseChargeYearly;
          bill.gets += plan.getRateYearly * totalStatistics.totalGets;
          bill.puts += plan.putRateYearly * totalStatistics.totalPuts;
          bill.memoryUsed += plan.memoryUseRateYearly * (totalStatistics.totalMemoryUsage/10000000);
          bill.bandwidth += plan.bandwidthRateYearly * (totalStatistics.totalBytesTransfered/10000000);
          break; 
        case 36:
          bill.baseCharge += plan.baseChargeThreeYear;
          bill.gets += plan.getRateThreeYear * totalStatistics.totalGets;
          bill.puts += plan.putRateThreeYear * totalStatistics.totalPuts;
          bill.memoryUsed += plan.memoryUseRateThreeYear * (totalStatistics.totalMemoryUsage/10000000);
          bill.bandwidth += plan.bandwidthRateThreeYear * (totalStatistics.totalBytesTransfered/10000000); 
      }

      bill.amountDue = bill.baseCharge + bill.gets + bill.puts + bill.memoryUsed + bill.bandwidth;
      
      _this.markModified('paymentPlan');
      _this.markModified('billing');
      
      // If there is penalty or interest incurring, it will be calculated
      // when the true bill is generated.
      _this.save(function(err, account) {
        if(err) {
          reject(err);
        } else {
          _this.resetStats().then(
            function(account) {
              resolve(account);
            },
            function(reason) {
              reject(reason);
            }
          );
        }
      });
    });
  };

  accountSchema.methods.changePlan = function(plan, term) {
    var _this = this;

    return Q.Promise(function(resolve, reject, notify) {
      app.db.model('BillingPlan').findOne({name: plan}, function(err, billingPlan) {
        if(err || !billingPlan) {
          err = err ? err : new Error('Billing Plan Does Not Exists!');
          reject(err);
        } else if(billingPlan.memoryAlloted < _this.getTotalMemoryUsage() &&
        billingPlan.baseChargeMonthly < _this.paymentPlan[0].plan.baseChargeMonthly) {
          reject(new Error('Cannot downgrade your plan, you must free up memory.'));
        } else if (_this.paymentPlan.contractTerm > term) {
          reject(new Error('You cannot cut your contract term'));
        } else if(plan === 'Freetrial') {
          reject(new Error('You cannot get another free trial!'));
        } else {
          _this.updateBill().then(
            function(account) {
              _this.paymentPlan[0].plan = billingPlan;
              _this.paymentPlan[0].contractTerm = term; 
              _this.save(function(err, account) {
                if(err) {
                  reject(err);
                } else {
                  resolve(account);
                }
              });
            },
            function(reason) {
              reject(reason);
            }
          );
        }
      });
    });
  };

  accountSchema.methods.getBillingPlan = function() {
    var _this = this;
    return Q.Promise(function(resolve, reject, notify) {
      var plan = _this.paymentPlan[0].plan;
      app.db.model('BillingPlan').findById(plan, function(err, billingPlan) {
        if(err || !billingPlan) {
          err = err ? err : new Error('Billing Plan not found');
          reject(err);
        } else {
          resolve(billingPlan);
        }
      });
    });
  };

  // TODO: test
  accountSchema.methods.defer = function(type, params) {
    var _this = this;

    return Q.Promise(function(resolve, reject, notify) {
      deferSchema.type = type;
      deferSchema.params = params;

      _this.defers.push(deferSchema);

      _this.save(function(err, account) {
        if(err) {
          reject(err);
        } else {
          resolve(account);
        }
      });
    });
  };

  // TODO: test
  accountSchema.methods.getTotalMemoryUsage = function() {
    var totalUsage = 0;

    _.forEach(this.projectStatistics, function(block) {
      totalUsage += block.currentBytes;
    });

    return totalUsage;
  }

  // TODO: test
  accountSchema.methods.getTotalBytesTransfered = function() {
    var totalBytesTransfered = 0;

    _.forEach(this.projectStatistics, function(block) {
      totalBytesTransfered += block.bytesTransfered;
    });

    return totalBytesTransfered;
  }

  accountSchema.methods.getTotalStatistics = function() {
    var totalGets = 0,
        totalPuts = 0,
        totalBytesTransfered = 0,
        totalMemoryUsage = 0;

    _.forEach(this.projectStatistics, function(block) {
      totalGets += block.gets;
      totalPuts += block.puts;
      totalBytesTransfered += block.bytesTransfered;
      totalMemoryUsage += block.currentBytes;
    });

    return {
      totalGets: totalGets,
      totalPuts: totalPuts,
      totalBytesTransfered: totalBytesTransfered,
      totalMemoryUsage: totalMemoryUsage
    };
  }


  // TODO: test
  accountSchema.methods.updateCard = function(customerId) {
    var _this = this;
    return Q.Promise(function(resolve, reject, notify) {
      _this.card = customerId;

      _this.save(function(err, account) {
        if(err) {
          reject(err);
        } else {
          resolve(account);
        }
      })
    });
  };

  // Tested
  accountSchema.methods.setGets = function(keys) {
    var _this = this;

    return Q.Promise(function(resolve, reject, notify) {

      try {
        for(var i = 0; i < keys.length; i ++) {
          var key = keys[i];
          _this.projectStatistics[key].gets ++;
          _this.projectStatistics[key].bytesTransfered += _this.projectStatistics[key].currentBytes;
        }
      } catch(err) {
        reject(err);
        return;
      }

      _this.markModified('projectStatistics');
      _this.save(function(err) {
        if(err) {
          reject(err);
        } else {
          resolve();
        }
      });

    });
  };

  // Tested
  accountSchema.methods.incrementGet = function(key) {
    var _this = this;

    return Q.Promise(function(resolve, reject, notify) {

      if(!_this.projectStatistics || !_this.projectStatistics[key]) {
        reject(new Error('Cannot get statistics for undefined block'));
        return;
      }

      _this.projectStatistics[key].gets ++;
      _this.projectStatistics[key].bytesTransfered += _this.projectStatistics[key].currentBytes;
      _this.markModified('projectStatistics');
      _this.save(function(err) {
        if(err) {
          reject(err);
        } else {
          resolve();
        }
      });

    });
  };

  // Tested
  accountSchema.methods.incrementPut = function(key, content) {
    var _this = this,
        currentBytes = Buffer.byteLength(content, 'utf8');

    return Q.Promise(function(resolve, reject, notify) {
      _this.projectStatistics[key] = _this.projectStatistics[key] ?
                                     _this.projectStatistics[key] : {};

      _this.projectStatistics[key].currentBytes = currentBytes;
      _this.projectStatistics[key].puts ++;
      _this.markModified('projectStatistics');
      _this.save(function(err, account) {
        if(err) {
          reject(err);
        } else {
          resolve(account);
        }
      });

    });
  }

  // Tested
  accountSchema.methods.resetStats = function() {
    var _this = this,
        defer = Q.defer(),
        keys = Object.keys(_this.projectStatistics);

    for(var i = 0; i < keys.length; i ++) {
      _this.projectStatistics[keys[i]].puts = 0;
      _this.projectStatistics[keys[i]].gets = 0;
      _this.projectStatistics[keys[i]].bytesTransfered = 0;
    }
    
    _this.markModified('projectStatistics');
    
    // Is rumored to return a promise
    _this.save(function(err, account) {
      if(err) {
        defer.reject(err);
      } else {
        defer.resolve(account);
      }
    });

    return defer.promise;
  }

  // Tested
  accountSchema.methods.statExists = function(key) {
    return  this.projectStatistics != undefined &&
            this.projectStatistics != null &&
            this.projectStatistics[key] != undefined &&
            this.projectStatistics[key] != null;
  }

  // Tested
  accountSchema.methods.createStat = function(key, content) {
    var _this = this;
    return Q.Promise(function(resolve, reject, notify) {
      _this.projectStatistics = _this.projectStatistics == null ||
                                _this.projectStatistics == undefined
                                ? {} : _this.projectStatistics;

      _this.projectStatistics[key] = {
        currentBytes: Buffer.byteLength(content, 'utf8'),
        bytesTransfered: 0,
        gets: 0,
        puts: 1
      };

      _this.markModified('projectStatistics');
      _this.save(function(err) {
        if(err) {
          reject(err);
        } else {
          resolve();
        }
      });

    });
  }

  accountSchema.plugin(require('./plugins/pagedFind'));
  accountSchema.index({ user: 1 });
  accountSchema.index({ 'status.id': 1 });
  accountSchema.index({ search: 1 });
  accountSchema.set('autoIndex', (app.get('env') === 'development'));
  app.db.model('Account', accountSchema);
};
