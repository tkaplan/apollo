var _ = require('lodash'), 
    async = require('async'),
    AWS = require('aws-sdk'),
    params = {
      Bucket: require('./aws-global-vars').bucketName
    };

function extractKeys(page) {
  var blockNames = Object.keys(page.blocks),
      blockKeys = [];

  _(blockNames).forEach(function(blockName) {
    blockKeys.push({
      awsKey: page.blocks[blockName].key,
      blockName: blockName
    });
  });

  return blockKeys;
};

exports = module.exports = function(page, resolve, reject) {
  var s3 = new AWS.S3(),
      errors = [],
      pageContent = {},
      blockKeys = extractKeys(page);

  async.each(blockKeys, function(key, done) {
    params.Key = key.awsKey;
    s3.getObject(params, function(err, data) {
      data = data ? data : {Body: {}};
      pageContent[key.blockName] = {
        content: data.Body.toString()
      };
      done(err);
    });
  }, function(err) {
    if(err) {
      reject(err);
    } else {
      resolve({blocks:pageContent});
    }
  });
};