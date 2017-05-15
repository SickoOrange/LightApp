"use strict";
var path = require('path');

var express = require('express');
var bodyParser = require('body-parser');
var serveIndex = require('serve-index');
var serveStatic = require('serve-static');

var R = require('./R');

// application - server
var app = {};

var init = function () {
    // configuration application
    if (R.projectconfig.isHttps == true)
        app = express(R.projectconfig.httpsOptions);
    else
        app = express();
    app.locals.title = R.projectconfig.app.appname;
    app.locals.strftime = require('strftime');
    app.use(bodyParser.json({
        limit: '50mb'
    }));
    app.use(bodyParser.urlencoded({
        limit: '50mb',
        extended: true
    }));

    // public directory
    app.use(express.static(path.join(__dirname, './public')));

    // log get/post/put/delete
    app.use(function (req, res, next) {
        R.utils.inspection("......................................");
        R.utils.inspect("new request", req.method + " " + req.originalUrl);
        R.utils.inspect("new request query", req.query);
        R.utils.inspect("new request params", req.params);
        R.utils.inspect("new request body", req.body);
        next();
    });

    app.all('*', function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
    });

    app.get('/', function (req, res, next) {
        res.sendFile(path.join(__dirname, './public/index-dev.html'));
    });

}

var initRouters = function () {
    // routers
    var router = require("./routers/router");
    app.use("/", router);
}

var startServer = function () {
    // Run server

    // kill running 
    // lsof -i tcp:3000
    if (R.projectconfig.isHttps == true) {
        console.log("Starting server on the https://" + R.projectconfig.config.local_address + ":" + R.projectconfig.config.port + "");
        var https = require('https');
        https.createServer(R.projectconfig.httpsOptions, app).listen(R.projectconfig.config.port);
        console.log("Server is running");
    } else {
        console.log("Starting server on the http://" + R.projectconfig.config.local_address + ":" + R.projectconfig.config.port + "");
        app.listen(R.projectconfig.config.port);
        console.log("Server is running");
    }
}

var validateConfigModule = function (config_module) {
    var default_config_module = {
        configPath_local: path.join(__dirname, "./configurations/config.local.json"),
        configPath_global: path.join(__dirname, "./configurations/config.global.json"),

        enviroment: 'prod',
    }
    config_module = R.utils.combine(default_config_module, config_module);
    return config_module;
}

var createServer = function (config_module) {
    config_module = validateConfigModule(config_module);
    R.projectconfig_loader(config_module);
    init();
    initRouters();
}

/**
 * @arguments 
 * @description create express server
 * @return express application
 * @example 
 */
exports.createServer = function (config_module) {
    createServer();
    return { app: app, R: R };
}

/**
 * @arguments
 * @description start server
 * @example listen()
 */
exports.listen = function () {
    startServer();
}

createServer();


startServer();