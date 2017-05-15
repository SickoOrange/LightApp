"use strict"
var path = require('path');
var exec = require('child_process').exec;

function executeCommand(command, startMessage, endMessage, callback) {
    function log(message) {
        if (message) {
            console.log(message);
        }
    }
    log(startMessage);
    var child = exec(command,
    function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
            console.log('exec error: ' + error);
            callback(error);
        } else {
            log(endMessage);
            callback();
        }
    });
}

executeCommand('npm install', 'Installing server\'s dependencies...', "", function(err) {
    if (err) {
        console.log(err);
        console.log("Try again.");
    } else {
        installAndRun();
    }
});

function installAndRun () {
    var R = require('./src/R');
    var Promise = require('promise');

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
            pidSufix: "_PID"
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

    function executeCommandP(command, startMessage, endMessage) {
        return new Promise(function(resolve, reject) {
            executeCommand(command, startMessage, endMessage, function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            })
        });
    }

    function installClientDependencies() {
        return executeCommandP('cd ./src/client && npm install', 'Installing client\'s dependencies...');
    }

    function buildClientScriptByWebpack() {
        return executeCommandP('cd ./src/client && webpack --minify', 'Building client\'s scripts by webpack...');
    }

    function startServer(appname, port) {
        return new Promise(function(resolve, reject) {
            console.log("Starting server " + appname + " on port " + port + "...");
            var foreverOptions = {
                append: true,
                logFile: path.join(config.log.logDir, "log" + config.log.foreverDirSufix),
                outFile: path.join(config.log.logDir, "log" + config.log.stdoutDirSufix),
                errFile: path.join(config.log.logDir, "log" + config.log.stderrSufix),
                pidFile: path.join(config.log.logDir, "log" + config.log.pidSufix),
                minUptime: 1000,
                spinSleepTime: 1000,
                uid: appname
            }
            var forever = require('forever');
            var daemon = forever.startDaemon(config.appPath, foreverOptions);
            console.log("Server is running with PID: " + daemon.pid); 
            resolve(); 
        });
    }

    initConfig();
    var appname = R.projectconfig.app.appname;
    var port = R.projectconfig.config.port;

    installClientDependencies()
    .then(buildClientScriptByWebpack)
    .then(function(){
        startServer(appname, port);
    })
    .catch(function(err) {
        console.error(err);
    });
}
