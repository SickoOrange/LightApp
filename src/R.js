"use strict";
var exports = module.exports = {};

var moment = require('moment');
var projectconfig = require("nextap-base-utility").config;

moment().utcOffset(2);

// first you must call projectconfig_loader(config)
exports.projectconfig = null;

exports.projectconfig_loader = function (config_module) {
    projectconfig.config_loader(config_module);
    exports.projectconfig = projectconfig.config;
}
//exports.projectconfig = require("./modules/projectconfigModule");

exports.utils = require("nextap-base-utility").utils;
exports.validation = require("nextap-base-utility").validation;

exports.getTimestamp = function () {
    return moment().format('YYYY-MM-DD HH:mm:ss');
};

exports.toResponse = function (status, view, data, err, err_message, redirectPage) {
    if (err != null) {
        exports.utils.err("(" + err + ") " + err_message);
    }
    return {status: status, view: view, data: data, err: err, err_message: err_message, redirectPage: redirectPage};
}

exports.toRedirect = function (redirectPage) {
    return {status: null, view: null, data: null, err: null, err_message: null, redirectPage: redirectPage};
}

exports.responseView = function (dataContainer, res, next) {
    exports.utils.responseView(dataContainer, res, next);
}

exports.generateID = function() {
    var today = new Date().toISOString().replace(/[^\d]/g, '').substr(2);
    return today;
}

exports.guid = function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}
