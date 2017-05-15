"use strict"
var path = require('path');
var R = require('./src/R');
var forever = require('forever');

var config = {
    configPath_local: path.join(__dirname, "./src/configurations/config.local.json"),
    configPath_global: path.join(__dirname, "./src/configurations/config.global.json"),
    enviroment: 'prod',
    appPath: path.join(__dirname, "./src/app.js"),
    log: {
        logDir: path.join(__dirname, "./logs/"),
        foreverDirSufix:"_FOREVER",
        stdoutDirSufix:"_STDOUT",
        stderrSufix:"_STDERR",
    }
}

var validateConfigModule = function(config_module) {
    var default_config_module = {
        configPath_local: config.configPath_local,
        configPath_global: config.configPath_global,
        enviroment: config.enviroment,
    }
    config_module = R.utils.combine(default_config_module, config_module);
    return config_module;
}

var initConfig = function(config_module) {
    config_module = validateConfigModule(config_module);
    R.projectconfig_loader(config_module);
}

initConfig();

var appname = R.projectconfig.app.appname;
console.log("Stopping server " + appname + "...");
forever.stop(appname);
console.log("Server stopped")
