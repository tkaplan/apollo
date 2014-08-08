module.exports = function(req, res, email, bills, amount, txn, last4, brand) {
  req.app.utility.sendmail(req, res, {
    from: req.app.get('smtp-from-name') + ' <' + req.app.get('smtp-from-address') + '>',
    to: email,
    subject: "Payment Confirmation for CAAS Services",
    textPath: 'text/payment-confirmation',
    htmlPath: 'html/payment-confirmation',
    locals: {
      username: req.user.username,
      email: email,
      bills: bills,
      amount: amount,
      txn: txn,
      last4: last4,
      brand: brand
    }
  });
} 