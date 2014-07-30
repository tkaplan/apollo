exports.buy = function(req, res) {
  // Add card to account
  // Change plan term
}

exports.change = function(req, res) {
  // If current memory usage is over allocated memory plan change
    // Reject, user must prune content first
  // Else
    // Defer plan change at end of the month
}

// Cancels monthly automatic renewal
exports.cancel = function(req, res) {
  // If plan is monthly then you can cancel
    // Add defer cancel plan to account
  // Else
    // reject
}