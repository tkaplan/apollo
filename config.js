'use strict';

exports.port = process.env.PORT || 3000;
exports.mongodb = {
  uri: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'localhost/drywall',
  testUri: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'localhost/drywallTest'
};
exports.companyName = 'Apollo, Inc.';
exports.projectName = 'Authentication Web Service';
exports.systemEmail = 'tks.universe@gmail.com';
exports.cryptoKey = 'awefoijfje98382#%$#%$#';
exports.stripeSK = 'sk_test_4Tw8TRE9Js4fAHUFIkizjXah';
exports.stripePK = 'pk_test_4Tw8iV5onKraKG9SZJjrdS4Z';
exports.loginAttempts = {
  forIp: 50,
  forIpAndUser: 7,
  logExpiration: '20m'
};
exports.redis = {};
exports.requireAccountVerification = true;
exports.smtp = {
  from: {
    name: process.env.SMTP_FROM_NAME || exports.projectName +' Website',
    address: process.env.SMTP_FROM_ADDRESS || 'tks.universe@gmail.com'
  },
  credentials: {
    user: process.env.SMTP_USERNAME || 'tks.universe@gmail.com',
    password: process.env.SMTP_PASSWORD || 'GK37nZ??',
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    ssl: true
  }
};
exports.oauth = {
  twitter: {
    key: process.env.TWITTER_OAUTH_KEY || '',
    secret: process.env.TWITTER_OAUTH_SECRET || ''
  },
  facebook: {
    key: process.env.FACEBOOK_OAUTH_KEY || '',
    secret: process.env.FACEBOOK_OAUTH_SECRET || ''
  },
  github: {
    key: process.env.GITHUB_OAUTH_KEY || '',
    secret: process.env.GITHUB_OAUTH_SECRET || ''
  },
  google: {
    key: process.env.GOOGLE_OAUTH_KEY || '',
    secret: process.env.GOOGLE_OAUTH_SECRET || ''
  }
};
