
var app = require('../db-mock').app,
    Q = require('q'),
    BillingPlan,
    billingConfig = require('../../billing-config');
    mongoose = require('../db-mock').mongoose;

describe("billing config", function() {
  before(function(done) {
    //require('../../schema/User')(app,mongoose);
    require('../../schema/BillingPlan')(app,mongoose);
 	done();
  });

  it("Add billing plans", function(done) {
    var BillingPlan = app.db.model('BillingPlan');
    billingConfig.billingPlanFixtures(BillingPlan, function(err) {
    	console.log("Error is: " + err);
    	done();
    });
  });

});