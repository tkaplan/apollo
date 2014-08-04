var async = require('async'),
    _ = require('lodash');

var BillingPlans = [
  {
    name: 'Freetrial',
    memoryAlloted: 1000,  // Max GB
    expiration: 30,      // Days
    getsCap: 50000,      // For the month
    putsCap: 10000,      // For the month
    bandwidthCap: .1,    // 100 MB for the month
    baseChargeMonthly: 0 // No base charge
  },
  {
    name: 'Bronze',
    memoryAlloted: 2000,

    getRateMonthly: 0.000008,
    putRateMonthly: 0.00001,
    memoryUseRateMonthly: 0.03,
    bandwidthRateMonthly: 0.04,
    baseChargeMonthly: 15,

    getRateYearly: 0.000008,
    putRateYearly: 0.00001,
    memoryUseRateYearly: 0.03,
    bandwidthRateYearly: 0.04,
    baseChargeYearly: 12.5,

    getRateThreeYear: 0.000008,
    putRateThreeYear: 0.00001,
    memoryUseRateThreeYear: 0.03,
    bandwidthRateThreeYear: 0.04,
    baseChargeThreeYear: 10
  },
  {
    name: 'Silver',
    memoryAlloted: 3000,

    getRateMonthly: 0.000008,
    putRateMonthly: 0.00001,
    memoryUseRateMonthly: 0.03,
    bandwidthRateMonthly: 0.04,
    baseChargeMonthly: 29,

    getRateYearly: 0.000008,
    putRateYearly: 0.00001,
    memoryUseRateYearly: 0.03,
    bandwidthRateYearly: 0.04,
    baseChargeYearly: 27.5,

    getRateThreeYear: 0.000008,
    putRateThreeYear: 0.00001,
    memoryUseRateThreeYear: 0.03,
    bandwidthRateThreeYear: 0.04,
    baseChargeThreeYear: 25
  },
  {
    name: 'Gold',
    memoryAlloted: 4000,

    getRateMonthly: 0.000008,
    putRateMonthly: 0.00001,
    memoryUseRateMonthly: 0.03,
    bandwidthRateMonthly: 0.04,
    baseChargeMonthly: 70,

    getRateYearly: 0.000008,
    putRateYearly: 0.00001,
    memoryUseRateYearly: 0.03,
    bandwidthRateYearly: 0.04,
    baseChargeYearly: 67.5,

    getRateThreeYear: 0.000008,
    putRateThreeYear: 0.00001,
    memoryUseRateThreeYear: 0.03,
    bandwidthRateThreeYear: 0.04,
    baseChargeThreeYear: 65
  },
  {
    name: 'Platinum',
    memoryAlloted: 5000,

    getRateMonthly: 0.000008,
    putRateMonthly: 0.00001,
    memoryUseRateMonthly: 0.03,
    bandwidthRateMonthly: 0.04,
    baseChargeMonthly: 135,

    getRateYearly: 0.000008,
    putRateYearly: 0.00001,
    memoryUseRateYearly: 0.03,
    bandwidthRateYearly: 0.04,
    baseChargeYearly: 130,

    getRateThreeYear: 0.000008,
    putRateThreeYear: 0.00001,
    memoryUseRateThreeYear: 0.03,
    bandwidthRateThreeYear: 0.04,
    baseChargeThreeYear: 125
  },
  {
    name: 'Unlimited',
    memoryAlloted: null,

    getRateMonthly: 0.000008,
    putRateMonthly: 0.00001,
    memoryUseRateMonthly: 0.03,
    bandwidthRateMonthly: 0.04,
    baseChargeMonthly: 250,

    getRateYearly: 0.000008,
    putRateYearly: 0.00001,
    memoryUseRateYearly: 0.03,
    bandwidthRateYearly: 0.04,
    baseChargeYearly: 225,

    getRateThreeYear: 0.000008,
    putRateThreeYear: 0.00001,
    memoryUseRateThreeYear: 0.03,
    bandwidthRateThreeYear: 0.04,
    baseChargeThreeYear: 200
  }
];

exports.billingPlanFixtures = function(BillingPlan, next) {
  
  function addPlan(plan, callback){
    var billingPlan = _.indexBy(BillingPlans, 'name')[plan];
    if(billingPlan) {
      BillingPlan.findOne({name: billingPlan.name}, function(err, plan) {
        if(err) {
          callback(err);
        } else if(!plan) {
          plan = new BillingPlan(billingPlan);
          plan.isNew = true;
          plan.save(function(err, plan) {
            if(err) {
              callback(err);
            } else {
              callback();
            }
          });
        } else {
          // Update our database
          _(billingPlan).forOwn(function(value, key) {
            plan[key] = value;
          });

          plan.save(function(err, plan) {
            if(err) {
              callback(err);
            } else {
              callback();
            }
          });
        }
      });
    }
  }

  async.parallel([
      function(callback) {
        addPlan('Freetrial', callback);
      },
      function(callback) {
        addPlan('Bronze', callback);
      },
      function(callback) {
        addPlan('Silver', callback);
      },
      function(callback) {
        addPlan('Gold', callback);
      },
      function(callback) {
        addPlan('Platinum', callback);
      },
      function(callback) {
        addPlan('Unlimited', callback);
      }
    ], function(err, results) {
      if(next)
        next(err);
  });
};