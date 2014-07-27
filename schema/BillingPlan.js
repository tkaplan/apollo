'use strict';

exports = module.exports = function(app, mongoose) {

  var billingPlanSchema = new mongoose.Schema({
    name: { type: String },
    getRateMonthly: { type: Number },
    putRateMonthly: { type: Number },
    bandwidthRateMonthly: { type: Number },
    memoryUseRateMonthly: { type: Number },
    getRateYearly: { type: Number },
    putRateYearly: { type: Number },
    bandwidthRateYearly: { type: Number },
    memoryUseRateYearly: { type: Number },
    getRateThreeYear: { type: Number },
    putRateThreeYear: { type: Number },
    bandwidthRateThreeYear: { type: Number },
    memoryUseRateThreeYear: { type: Number },
  });

  app.db.model('Account', accountSchema);
};
