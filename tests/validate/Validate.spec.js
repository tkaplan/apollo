'use strict';

var validate = require('../../validate/validate'),
    should = require('should');
    
describe("Validate", function() {

  var str256 = '',
      str257 = '',
      str41 = '',
      str40 = '',
      str33 = '',
      str32 = '';

  before(function(done) {
    for(var i = 0; i < 257; i ++) {
      str257 += 'a';

      if(i < 256)
        str256 += 'a';

      if(i < 41)
        str41 += 'a';

      if(i < 40)
        str40 += 'a';

      if(i < 33)
        str33 += 'a';

      if(i < 32)
        str32 += 'a';
    }
    done();
  });

  describe('password', function() {
    it('should only be 3-32 characters long', function(done) {
      validate.password('heaa').valid.should.be.true;
      validate.password('aaa').valid.should.be.true;
      validate.password(str32).valid.should.be.true;
      validate.password('a').valid.should.be.false;
      validate.password(str33).valid.should.be.false;
      done();
    });

    it('should be any kind of character', function(done) {
      validate.password('~!@#$%^Aa&*()_+-=|}{][":\';<>?,.').valid.should.be.true;
      done();
    });
  });

  describe('username', function() {
    it('should only be 3-32 characters long', function(done) {
      validate.username('a').valid.should.be.false;
      validate.username('aaa').valid.should.be.true;
      validate.username(str32).valid.should.be.true;
      validate.username(str33).valid.should.be.false;
      done();
    });

    it('should only be a-z, A-Z, 0-9, - _ characters', function(done) {
      validate.username('aAzZ09-_').valid.should.be.true;
      validate.username('aaaa@').valid.should.be.false;
      done();
    });
  });

  describe('project', function() {
    it('should only be 3-256 characters long', function(done) {
      validate.project(str256).valid.should.be.true;
      validate.project(str257).valid.should.be.false;
      validate.project('a').valid.should.be.false;
      validate.project('aaa').valid.should.be.true;
      done();
    });

    it('should only be characters a-z, A-Z, 0-9, -', function(done) {
      validate.project('aAzZ09-').valid.should.be.true;
      validate.project('@').valid.should.be.false;
      done();
    })
  });

  describe('email', function() {
    it('should only be 3-40 characters long', function(done) {
      validate.email('aaaaaaaaaaaaaaaaaaaa@aaaaaaaaaaaaaaa.com').valid.should.be.true;
      validate.email('aaaaaaaaaaaaaaaaaaaa@aaaaaaaaaaaaaaaa.com').valid.should.be.false;
      validate.email('aaa@a.com').valid.should.be.true;
      validate.email('@').valid.should.be.false;
      done();
    });

    it('should be a valid email', function(done) {
      validate.email('hello@yahoo.com').valid.should.be.true;
      validate.email('taylor_kaplan121@bennychild.com').valid.should.be.true;
      validate.email('&@hello.com').valid.should.be.false;
      done();
    });
  });

  describe('name', function() {
    it('should only contain characters', function(done) {
      validate.name('AaZz').valid.should.be.true;
      validate.name('sss1').valid.should.be.false;
      validate.name('sss@').valid.should.be.false;
      done();
    });

    it('should only be 3-32 characters long', function(done) {
      validate.name('a').valid.should.be.false;
      validate.name('aaa').valid.should.be.true;
      validate.name(str32).valid.should.be.true;
      validate.name(str33).valid.should.be.false;
      done();
    });
  });

});