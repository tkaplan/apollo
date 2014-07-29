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

  var billingSchema = new mongoose.Schema({
    start: { type: Date, default: moment()._d },
    due: { type: Date, default: moment().add('d', 30)._d },
    overdue: { type: Date, default: moment().add('d', 60)._d },
    amountDue: { type: Number, default: 0 },
    amountPaid: { type: Number, default: 0 },
    paid: { type: Boolean, default: false },
    baseCharge: { type: Number, default: 0 },
    cardStatus: { type: String, default: '' },
    gets: { type: Number, default: 0 },
    puts: { type: Number, default: 0 },
    bandwidth: { type: Number, default: 0 },
    memoryUsed: { type: Number, default: 0 },
    interest: { type: Number, default: 0 },
    penalty: { type: Number, default: 0 }
  });

  var paymentPlanSchema = new mongoose.Schema({
    contractTerm: { type: String },
    plan: { type: mongoose.Schema.Types.ObjectId, ref: 'BillingPlan' }
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
    paymentPlan: [ paymentPlanSchema ],
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
    //console.log(this);
    if(this.billing.length == 0) {
      var BillingPlan = app.db.model('BillingPlan');
      BillingPlan.findOne({name: 'Freetrial'}, function(err, freetrial) {
        if(err) {
          // Do something at somepoint, but can't throw errors
        } else {
          paymentPlanSchema.contractTerm = 'month';
          paymentPlanSchema.plan = freetrial;
          // Add payment plan
          _this.paymentPlan.push(paymentPlanSchema);

          // Create billing statement
          _this.billing.push(billingSchema);

          _this.save(function(err) {
            if(err){
              // Do something at some point but can't
              // throw errors
            } 
          });
        }
      });
    }
  });

  accountSchema.methods.buyPlan = function(plan, token) {
    var _this = this;
    var tok = app.get('stripeSK')(token);
    return Q.Promise(function(resolve, reject, notify) {

      // To buy a plan they must supply a plan
      // and a token to store

      // Before giving them a plan we must validate the credit
      // Information

      // If credit information is valid

        // Find plan

          // If no error and plan found

            // Create customer object

            // Update customer object in Account

            // Add plan to paymentPlan

            // Prorate latest billing statement

            // Async.save(billing statement, account)

            // Resolve on success();

          // Else reject

      // Else reject

    });
  };

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

  accountSchema.methods.incrementGet = function(key) {
    var _this = this;

    return Q.Promise(function(resolve, reject, notify) {

      if(_this.projectStatistics || !_this.projectStatistics[key]) {
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

  accountSchema.methods.incrementPut = function(key, content) {
    var _this = this,
        currentBytes = Buffer.byteLength(content, 'utf8');

    return Q.Promise(function(resolve, reject, notify) {
      _this.projectStatistics[key] = _this.projectStatistics[key] ?
                                     _this.projectStatistics[key] : {};

      _this.projectStatistics[key].currentBytes = currentBytes;
      _this.projectStatistics[key].puts ++;
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
        defer.resolve();
      }
    });

    return defer.promise;
  }

  accountSchema.methods.statExists = function(key) {
    return  this.projectStatistics != undefined &&
            this.projectStatistics != null &&
            this.projectStatistics[key] != undefined &&
            this.projectStatistics[key] != null;
  }

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
