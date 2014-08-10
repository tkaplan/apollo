module.exports = function(req, res, name, email, bills, amount, txn, last4, brand) {
  req.app.utility.sendmail(req, res, {
    from: req.app.get('smtp-from-name') + ' <' + req.app.get('smtp-from-address') + '>',
    to: email,
    subject: "Payment Confirmation for CAAS Services",
    textPath: '../email/text/payment-confirmation',
    htmlPath: '../email/html/payment-confirmation',
    locals: {
      username: req.user.username,
      name: name,
      email: email,
      bills: bills,
      amount: amount,
      txn: txn,
      last4: last4,
      brand: brand
    },
    success: function(message) {
      // Do nothing, don't care
    },
    error: function(err) {
      // Do nothing for now
    }
  });
} 