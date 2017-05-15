"use strict"
var utils = require('nextap-base-utility').utils;
var SocketModule = require('socketmodule').construct;
var socketModule = new SocketModule();
var request = require('request');
var R = require('../R');
var http = require('http');

const CLIENT_ID = R.projectconfig.app.deviceID;

var defaultOptions = {}

function lightsController(options) {
    var _this = this;
    this.options = utils.combine(defaultOptions, options);

    post(R.projectconfig.app.phpApi + 'scan', { command: "scan" })
        .then((data) => {

            let lights = data.body;
            var functions = [];
            for (let light of lights) {

                if (light.ID == 0) {
                    _this.lights = lights;
                    break;
                }
            }
            if (_this.lights) {
                for (let i in _this.lights) {

                    functions.push(post(R.projectconfig.app.phpApi, { command: 'clear', BDADDR: _this.lights[i].BDADDR }));
                }
            }
            return Promise.all(functions);
        })
        .then(() => {
            if (_this.lights) {
                var functions = [];
                for (let i in _this.lights) {
                    functions.push(post(R.projectconfig.app.phpApi, { command: "id", BDADDR: _this.lights[i].BDADDR, ID: i }));
                }
            }
            return Promise.all(functions);
        })
        .then(() => {
            if (_this.lights) {
                var functions = [];
                for (let i in _this.lights) {
                    functions.push(post(R.projectconfig.app.phpApi, { command: "group", device_id: i, group_number: i }));
                }
            }
            return Promise.all(functions);
        })
        .then(() => {
            return connectSocket();
        })
        .catch((err) => {
            console.log(err);
        });

    function connectSocket() {
        return new Promise((resolve, reject) => {
            var options = {
                logHeartbeat: true
            };
            socketModule.connectType(R.projectconfig.app.socket.client.type, R.projectconfig.app.socket.client.host, R.projectconfig.app.socket.client.port, options, (client) => {
                client.on('SERVER_EMIT', (socketData) => {
                    switch (socketData.command) {
                        case 'getLights':
                            console.log("get lights")
                            _this.getLights()
                                .then((lights) => {
                                    socketData.lights = lights;
                                    socketModule.clientEmit(socketData);
                                });
                            break;
                        case 'setLight':
                            console.log("set lights")
                            _this.setLight(socketData.config);
                            break;
                        default:
                            break;
                    }
                });
            });
            resolve();
        });
    }

    var fakeLights = [{
        "BDADDR": "00347862",
        "ID": "00347862",
        "password": "test",
        "version": "1.9",
        "repeater": true,
        "dimm": 100
    }, {
        "BDADDR": "00347865",
        "ID": "00347865",
        "password": "test",
        "version": "1.9",
        "repeater": false,
        "dimm": 50
    }, {
        "BDADDR": "00347867",
        "ID": "00347867",
        "password": "test",
        "version": "1.9",
        "repeater": false,
        "dimm": 0
    }]


    this.getGroups = function () {
        return new Promise(
            (resolve, reject) => {
                var data = JSON.stringify({
                    "command": "groups_poll"
                });
                lightRequest(data, resolve, reject);

            }
        );
    }



    this.getGroupLights = function (groupid) {
        return new Promise(
            (resolve, reject) => {
                var id = groupid.toString().substring(1, groupid.length);
                var data = JSON.stringify({
                    "command": "groupLights_poll",
                    "groupid": id
                });
                lightRequest(data, resolve, reject);
            }
        );

    }

    this.getPoll = function (groupLights) {
        return new Promise(
            (resolve, reject) => {
                var data = JSON.stringify({
                    "command": "poll"
                });
                lightRequest(data, resolve, reject);
            }
        );
    }


    this.setBlink = function (blinkCommand) {
        return new Promise(
            (resolve, reject) => {
                var data = JSON.stringify(blinkCommand);
                lightRequest(data, resolve, reject);
            }
        );
    }

    this.setDimmLight = function (dimmCommand) {
        return new Promise(
            (resolve, reject) => {
                var data = JSON.stringify(dimmCommand);
                lightRequest(data, resolve, reject);
            }
        );
    }

    this.passwordSetting = function (pwCommand) {
        return new Promise((resolve, reject) => {
            var data = JSON.stringify(pwCommand);
            lightRequest(data, resolve, reject);
        });
    }

    this.identification = function (identificationCommand) {
        return new Promise((resolve, reject) => {
            var data = JSON.stringify(identificationCommand);
            lightRequest(data, resolve, reject);
        });
    }

    this.groupHandle = function (groupHandleCommand) {
        return new Promise((resolve, reject) => {
            var data = JSON.stringify(groupHandleCommand);
            lightRequest(data, resolve, reject);
        });
    }

    this.sceneHandle = function (sceneHandleCommand) {
        return new Promise((resolve, reject) => {
            var data = JSON.stringify(sceneHandleCommand);
            lightRequest(data, resolve, reject);
        });
    }

    this.sequenceHandle = function (sequenceHandleCommand) {
        return new Promise((resolve, reject) => {
            var data = JSON.stringify(sequenceHandleCommand);
            lightRequest(data, resolve, reject);
        });
    }



    function lightRequest(data, resolve, reject) {
        var options = {
            //url: 'http://192.168.90.57:3777/hook/api',
            host: '192.168.90.57',
            port: '6777',
            path: '/hook/api',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Length': data.length
            }
        };
        var req = http.request(options, (res) => {
            var msg = '';
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                msg += chunk;
            });
            res.on('end', function () {
                console.log("lightRes:" + msg);
                var lightRes = JSON.parse(msg.toString());
                resolve(lightRes);
            });
        });
        req.write(data);
        req.end();
        //resolve data
    }

    this.getLights = function () {
        return new Promise((resolve, reject) => {
            /*
            request.post(R.projectconfig.app.phpApi + 'scan', function (error, response, body) {
                if (error) {
                    return reject(error);
                }
                resolve(JSON.parse(body));
            });
            */
            resolve(fakeLights);
        });
    }

    this.getLight = function (ID) {
        return new Promise((resolve, reject) => {
            for (let i in lights) {
                if (lights[i].ID == ID) {
                    return resolve(lights[i]);
                }
            }
            return resolve('Light not found');
        });
    }

    this.setLight = function (data) {
        /* SEND COMMANDS TO PHPAPI */
        /*var url = R.projectconfig.app.phpApi;
        return post(url, data);*/
        return new Promise((resolve, reject) => {
            console.log('===========================\n' + JSON.stringify(data, null, 4) + '\n===========================');
            if (data.command == 'dimm') {
                var BDADDR = data.BDADDR ? data.BDADDR : data.group_id;
                for (let i in fakeLights) {
                    if (fakeLights[i].BDADDR == BDADDR) {
                        fakeLights[i].dimm = data.dimm_value;
                        return resolve();
                    }
                }
                return resolve('Light not found');
            } else {
                return resolve();
            }
        });
    }
}

function post(uri, data) {
    return new Promise((resolve, reject) => {
        var options = {
            uri: uri.toLowerCase(),
            method: 'POST',
            json: data
        };
        request(options, (error, response, body) => {
            if (error)
                reject(error);
            resolve({ response, body });
        });
    });
}

/**
 * Expose `lightsController` directly from package.
 */
exports = module.exports = lightsController;

/**
 * Export constructors.
 */
exports.construct = lightsController;