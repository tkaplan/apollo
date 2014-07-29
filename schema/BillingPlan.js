'use strict';

exports = module.exports = function(app, mongoose) {

  var billingPlanSchema = new mongoose.Schema({
    name: { type: String, unique: true },
    memoryAlloted: { type: Number },

    expiration: { type: Number, default: null },
    getsCap: { type: Number, default: null },
    putsCap: { type: Number, default: null },
    bandwidthCap: { type: Number, default: null },

    getRateMonthly: { type: Number },
    putRateMonthly: { type: Number },
    bandwidthRateMonthly: { type: Number },
    memoryUseRateMonthly: { type: Number },
    baseChargeMonthly: { type: Number },

    getRateYearly: { type: Number },
    putRateYearly: { type: Number },
    bandwidthRateYearly: { type: Number },
    memoryUseRateYearly: { type: Number },
    baseChargeYearly: { type: Number },

    getRateThreeYear: { type: Number },
    putRateThreeYear: { type: Number },
    bandwidthRateThreeYear: { type: Number },
    memoryUseRateThreeYear: { type: Number },
    baseChargeThreeYear: { type: Number }
  });

  app.db.model('BillingPlan', billingPlanSchema);
};
