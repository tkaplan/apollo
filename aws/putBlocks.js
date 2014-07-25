var async = require('async'),
  AWS = require('aws-sdk'),
  params = {
    Bucket: require('./aws-global-vars').bucketName
  };

exports = module.exports = function(blockData, resolve, reject) {
  var s3 = new AWS.S3();
  async.each(blockData, function(block, done) {
      params.Key = block.key;
      params.Body = block.content;
      params.ACL = 'public-read';
      s3.putObject(params, function(err, data) {
        done(err);
      });
    }
    , function(err) {
      if(err) {
        reject(err);
      } else {
        resolve();
      }
  });
};