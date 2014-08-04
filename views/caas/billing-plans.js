exports.billingPlans = function(req, res) {
  res.header('Content-Type', 'application/json');

  req.app.db.models.BillingPlan.find(function(err, billingPlans) {
    res.status(200).send(billingPlans);
  })
}