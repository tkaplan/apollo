var _ = require('lodash'),
  AWS = require('aws-sdk'),
  params = {
    Bucket: require('./aws-global-vars').bucketName
  };

module.exports = function(blockKeys, resolve, reject) {
  var s3 = new AWS.S3();
  params.Delete = {
    Objects: []
  };

  _(blockKeys).forEach(function(blockKey) {
    params.Delete.Objects.push({
      Key: blockKey
    });
  });

  s3.deleteObjects(params, function(err, data) {
    if(err) {
      reject(err);
    } else {
      resolve();
    }
  });
};