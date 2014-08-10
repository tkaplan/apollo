var app = require('../db-inject').app,
    Q = require('q'),
    _ = require('lodash'),
    argv = require('yargs').argv,
    moment = require('moment'),
    mongoose = require('../db-inject').mongoose;
    require('../../schema/Account')(app, mongoose);

var billingSchema = new mongoose.Schema({
  start: { type: Date, default: moment()._d },
  due: { type: Date, default: moment().add('d', 30)._d },
  overdue: { type: Date, default: moment().add('d', 45)._d },
  amountDue: { type: Number, default: 0 },
  last4: { type: Number, default: 0 },
  brand: { type: String, default: null },
  txn: { type: String, default: '' },
  baseCharge: { type: Number, default: 0 },
  cardStatus: { type: String, default: '' },
  gets: { type: Number, default: 0 },
  puts: { type: Number, default: 0 },
  bandwidth: { type: Number, default: 0 },
  memoryUsed: { type: Number, default: 0 }
});

if(argv.help) {
  console.log("\n\
    --start (number of days before or after today)\n\
    --last4 (set the last4)\n\
    --brand (brand of credit card used to pay)\n\
    --txn (transaction number)\n\
    --baseCharge (set base charge)\n\
    --gets (set charge)\n\
    --puts (set charge)\n\
    --bandwidth (set charge)\n\
    --memoryUsed (set charge)\n\
  ");
  process.exit(1);
} else if(argv.remove) {
  app.db.model('Account').findOne({search: ['tkaplan']}, function(err, account) {
    _.remove(account.billing, function(bill) {return bill.id == argv.remove;});
    account.markModified('billing');
    account.save(function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log('Success!');
      }
      process.exit(1);
    });
  });
}else {
  app.db.model('Account').findOne({search: ['tkaplan']}, function(err, account) {
    billingSchema.start = argv.start ? moment().add('d',argv.start)._d : moment()._d;
    billingSchema.due = moment(billingSchema.start).add('d', 30)._d;
    billingSchema.overdue = moment(billingSchema.start).add('d', 45)._d;
    billingSchema.last4 = argv.last4 ? argv.last4 : 0;
    billingSchema.brand = argv.brand ? argv.brand : '';
    billingSchema.txn = argv.txn ? argv.txn : '';
    billingSchema.baseCharge = argv.baseCharge ? argv.baseCharge : 0;
    billingSchema.cardStatus = argv.cardStatus ? argv.cardStatus : '';
    billingSchema.gets = argv.gets ? argv.gets : 0;
    billingSchema.puts = argv.puts ? argv.puts : 0;
    billingSchema.bandwidth = argv.bandwidth ? argv.bandwidth : 0;
    billingSchema.memoryUsed = argv.memoryUsed ? argv.memoryUsed: 0;
    billingSchema.amountDue = billingSchema.baseCharge + 
                              billingSchema.gets + 
                              billingSchema.puts + 
                              billingSchema.bandwidth + 
                              billingSchema.memoryUsed;
    account.billing.push(billingSchema);
    account.save(function(err, account) {
      if(err) {
        console.log(err);
      } else {
        console.log("Success!");
        process.exit(1);
      }
    });
  });
}