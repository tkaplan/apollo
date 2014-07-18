var async = require('async'),
  AWS = require('aws-sdk'),
  params = {
    Bucket: require('./aws-global-vars').bucketName
  };

exports = module.exports = function(blockKeys, callback) {
  var s3 = new AWS.S3(),
      dataArray = [];
  async.each(blockKeys, function(key, done) {
    params.Key = key;
    s3.getObject(params, function(err, data) {
      if(err)
        console.log(err);
        //errors.push(err);
      dataArray.push(data);
      done();
    });
  }, function(err) {
    callback(dataArray);
  });
};