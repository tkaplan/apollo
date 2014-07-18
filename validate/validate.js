'use strict';

exports.password = function(password) {
  if (!/^(?=.{3,32}$)/.test(password)) {
    return {
      valid: false,
      error: 'password must be between 3-32 characters'
    };
  }
  return {
    valid: true
  };
};

exports.username = function(username) {
  if (!/^(?=.{3,32}$)[a-zA-Z0-9\-\_]+$/.test(username)) {
    return {
      valid: false,
      error: 'username must be between 3-32 characters and contain only the characters a-z A-Z 0-9 - _'
    }
  }
  return {
    valid: true
  }
};

exports.project = function(project) {
  if (!/^(?=.{3,256}$)[a-zA-Z0-9\-]+$/.test(project)) {
    return {
      valid: false,
      error: 'project can only be 3-256 characters'
    }
  }
  return {
    valid: true
  }
};

exports.page = function(page) {
  if (!/^(?=.{3,256}$)[a-zA-Z0-9\-\\]+$/.test(page)) {
    return {
      valid: false,
      error: 'page can only be 3-256 characters'
    }
  }
  return {
    valid: true
  }
};

exports.block = function(block) {
  if (!/^(?=.{3,256}$)[a-zA-Z0-9\-\\]+$/.test(block)) {
    return {
      valid: false,
      error: 'block can only be 3-256 characters'
    }
  }
  return {
    valid: true
  }
}

exports.email = function(email) {
  if (!/^(?=.{3,40}$)[a-zA-Z0-9\-\_\.\+]+@[a-zA-Z0-9\-\_\.]+\.[a-zA-Z0-9\-\_]+$/.test(email)) {
    return {
      valid: false,
      error: 'email is not valid or is not 3-40 characters long'
    };
  }
  return {
    valid: true
  }
};

exports.name = function(name) {
  if (!/^(?=.{3,32}$)[a-zA-Z\.]+$/.test(name)) {
    return {
      valid: false,
      error: 'name can only be letters from 3-32 characters'
    }
  }
  return {
    valid: true
  }
};