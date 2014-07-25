'use strict';

var Q = require('q'),
    _ = require('lodash');

exports = module.exports = function(app, mongoose) {
  
  // Let this be our embedded doc
  // {
  //   key: {
  //     currentBytes: { type: Number },
  //     bytesTransfered: { type: Number },
  //     gets: { type: Number },
  //     puts: { type: Number }
  //   }, ...

  var accountSchema = new mongoose.Schema({
    user: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      name: { type: String, default: '' }
    },
    isVerified: { type: String, default: '' },
    verificationToken: { type: String, default: '' },
    name: {
      first: { type: String, default: '' },
      middle: { type: String, default: '' },
      last: { type: String, default: '' },
      full: { type: String, default: '' }
    },
    company: { type: String, default: '' },
    phone: { type: String, default: '' },
    zip: { type: String, default: '' },
    status: {
      id: { type: String, ref: 'Status' },
      name: { type: String, default: '' },
      userCreated: {
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        name: { type: String, default: '' },
        time: { type: Date, default: Date.now }
      }
    },
    projectStatistics: mongoose.Schema.Types.Mixed,
    statusLog: [mongoose.modelSchemas.StatusLog],
    notes: [mongoose.modelSchemas.Note],
    userCreated: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      name: { type: String, default: '' },
      time: { type: Date, default: Date.now }
    },
    search: [String]
  });

  accountSchema.methods.setGets = function(keys) {
    var _this = this;

    return Q.Promise(function(resolve, reject, notify) {

      try {
        for(var i = 0; i < keys.length; i ++) {
          var key = keys[i];
          _this.projectStatistics[key].gets ++;
          _this.projectStatistics[key].bytesTransfered += _this.projectStatistics[key].currentBytes;
        }
      } catch(err) {
        reject(err);
        return;
      }

      _this.markModified('projectStatistics');
      _this.save(function(err) {
        if(err) {
          reject(err);
        } else {
          resolve();
        }
      });

    });
  };

  accountSchema.methods.incrementGet = function(key) {
    var _this = this;

    return Q.Promise(function(resolve, reject, notify) {

      if(_this.projectStatistics || !_this.projectStatistics[key]) {
        reject(new Error('Cannot get statistics for undefined block'));
        return;
      }

      _this.projectStatistics[key].gets ++;
      _this.projectStatistics[key].bytesTransfered += _this.projectStatistics[key].currentBytes;
      _this.markModified('projectStatistics');
      _this.save(function(err) {
        if(err) {
          reject(err);
        } else {
          resolve();
        }
      });

    });
  };

  accountSchema.methods.incrementPut = function(key, content) {
    var _this = this,
        currentBytes = Buffer.byteLength(content, 'utf8');

    return Q.Promise(function(resolve, reject, notify) {
      _this.projectStatistics[key] = _this.projectStatistics[key] ?
                                     _this.projectStatistics[key] : {};

      _this.projectStatistics[key].currentBytes = currentBytes;
      _this.projectStatistics[key].puts ++;
      _this.markModified('projectStatistics');
      _this.save(function(err) {
        if(err) {
          reject(err);
        } else {
          resolve();
        }
      });

    });
  }

  accountSchema.methods.resetStats = function() {
    var _this = this,
        defer = Q.defer(),
        keys = Object.keys(_this.projectStatistics);

    for(var i = 0; i < keys.length; i ++) {
      _this.projectStatistics[keys[i]].puts = 0;
      _this.projectStatistics[keys[i]].gets = 0;
      _this.projectStatistics[keys[i]].bytesTransfered = 0;
    }

    _this.markModified('projectStatistics');
    
    // Is rumored to return a promise
    _this.save(function(err, account) {
      if(err) {
        defer.reject(err);
      } else {
        defer.resolve();
      }
    });

    return defer.promise;
  }

  accountSchema.methods.statExists = function(key) {
    return  this.projectStatistics != undefined &&
            this.projectStatistics != null &&
            this.projectStatistics[key] != undefined &&
            this.projectStatistics[key] != null;
  }

  accountSchema.methods.createStat = function(key, content) {
    var _this = this;
    return Q.Promise(function(resolve, reject, notify) {
      _this.projectStatistics = _this.projectStatistics == null ||
                                _this.projectStatistics == undefined
                                ? {} : _this.projectStatistics;

      _this.projectStatistics[key] = {
        currentBytes: Buffer.byteLength(content, 'utf8'),
        bytesTransfered: 0,
        gets: 0,
        puts: 1
      };

      _this.markModified('projectStatistics');
      _this.save(function(err) {
        if(err) {
          reject(err);
        } else {
          resolve();
        }
      });

    });
  }

  accountSchema.plugin(require('./plugins/pagedFind'));
  accountSchema.index({ user: 1 });
  accountSchema.index({ 'status.id': 1 });
  accountSchema.index({ search: 1 });
  accountSchema.set('autoIndex', (app.get('env') === 'development'));
  app.db.model('Account', accountSchema);
};
