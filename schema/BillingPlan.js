'use strict';

exports = module.exports = function(app, mongoose) {

  var billingPlanSchema = new mongoose.Schema({
    name: { type: String, unique: true },
    memoryAlloted: { type: Number },

    expiration: { type: Number, default: null },
    getsCap: { type: Number, default: null },
    putsCap: { type: Number, default: null },
    bandwidthCap: { type: Number, default: null },

    getRateMonthly: { type: Number, default: 0 },
    putRateMonthly: { type: Number, default: 0 },
    bandwidthRateMonthly: { type: Number, default: 0 },
    memoryUseRateMonthly: { type: Number, default: 0 },
    baseChargeMonthly: { type: Number, default: 0 },

    getRateYearly: { type: Number, default: 0 },
    putRateYearly: { type: Number, default: 0 },
    bandwidthRateYearly: { type: Number, default: 0 },
    memoryUseRateYearly: { type: Number, default: 0 },
    baseChargeYearly: { type: Number, default: 0 },

    getRateThreeYear: { type: Number, default: 0 },
    putRateThreeYear: { type: Number, default: 0 },
    bandwidthRateThreeYear: { type: Number, default: 0 },
    memoryUseRateThreeYear: { type: Number, default: 0 },
    baseChargeThreeYear: { type: Number, default: 0 }
  });

  app.db.model('BillingPlan', billingPlanSchema);
};
