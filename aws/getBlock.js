var AWS = require('aws-sdk'),
    params = {
      Bucket: require('./aws-global-vars').bucketName
    };

exports = module.exports = function(block, resolve, reject) {
  var s3 = new AWS.S3(),
      errors = [],
      pageContent = {};

    params.Key = block.key;
    s3.getObject(params, function(err, data) {
      if(err) {
        reject(err);
      } else {
        data = data ? data : {Body:{}};
        resolve({
          content: data.Body.toString()
        });
      }
    });
};