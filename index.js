'use strict';

var path = require('path');
var _ = require('lodash');
var config = {};
var basePath = path.dirname(module.parent.id);

function getPath(obj, key) {
  return key.split('.').reduce(function (prev, cur) {
    return prev[cur];
  }, obj);
}

function getEnv() {
  if (process.env.NODE_ENV) {
    return process.env.NODE_ENV;
  } else {
    return 'development';
  }
}

function loadConfig(p) {
  var configFile = getEnv() + '.config.js';

  config = require(path.resolve(basePath, p, 'config.js'));

  if (getEnv() !== "development") {
    _.merge(config, require(path.resolve(basePath, p, configFile)));
  }
}

function get(key) {
  if (!key) return config;

  return getPath(config, key);
}

module.exports = function (p) {
  if (!p) throw new Error('need path of config files');

  loadConfig(p);

  return get;
};
