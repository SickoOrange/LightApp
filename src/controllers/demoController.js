"use strict"
var http = require('http');
var utils = require('nextap-base-utility').utils;
var SocketModule = require('socketmodule').construct;
var socketModule = new SocketModule();
var request = require('request');
var R = require('../R');

const CLIENT_ID = R.projectconfig.app.deviceID;

var defaultOptions = {}

function lightsController(options) {
    console.log('lightsController!');
    var _this = this;
    this.options = utils.combine(defaultOptions, options);
    // post(R.projectconfig.app.phpApi + 'scan', { command: "scan" })
    post()
        .then((data) => {
            console.log('post then data: ' + data);

            let lights = data;
            var functions = [];
            // for (let light of lights) {
            //     console.log('light.is type: '+typeof light.ID);
            //     if (light.ID == 0) {
            //         _this.lights = lights;
            //         break;
            //     }
            // }
            // console.log('_this.lights '+_this.lights);
            // if (_this.lights) {
            //     for (let i in _this.lights) {
            //         functions.push(post(R.projectconfig.app.phpApi, { command: 'clear', BDADDR: _this.lights[i].BDADDR }));
            //     }
            // }
            //  return Promise.all(functions);
        })
        .then(() => {
            // if (_this.lights) {
            //     var functions = [];
            //     // for (let i in _this.lights) {
            //     //     functions.push(post(R.projectconfig.app.phpApi, { command: "id", BDADDR: _this.lights[i].BDADDR, ID: i }));
            //     // }
            // }
            // return Promise.all(functions);
        })
        .then(() => {
            // if (_this.lights) {
            //     var functions = [];
            // for (let i in _this.lights) {
            //     functions.push(post(R.projectconfig.app.phpApi, { command: "group", device_id: i, group_number: i }));
            // }
            //   }
            // return Promise.all(functions);
        })
        .then(() => {
            //return connectSocket();
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
                            _this.getLights()
                                .then((lights) => {
                                    socketData.lights = lights;
                                    socketModule.clientEmit(socketData);
                                });
                            break;
                        case 'setLight':
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

    this.getLights = function() {
        return new Promise((resolve, reject) => {
            /*
            request.post(R.projectconfig.app.phpApi + 'scan', function (error, response, body) {
                if (error) {
                    return reject(error);
                }
                resolve(JSON.parse(body));
            });
            */
            console.log('function get lights');

            post().then((data) => {
                console.log('>: ' + JSON.parse(data));
                resolve(JSON.parse(data));
                // resolve(fakeLights);
            });

        });
    }

    this.getLight = function(ID) {
        return new Promise((resolve, reject) => {
            for (let i in lights) {
                if (lights[i].ID == ID) {
                    return resolve(lights[i]);
                }
            }
            return resolve('Light not found');
        });
    }

    this.setLight = function(data) {
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



function post() {
    return new Promise((resolve, reject) => {
        var data = JSON.stringify({
            'command': 'poll'
                //'command': 'scene',
                //	'sceneID': '03'
        });
        var options = {
            host: '192.168.90.57',
            port: '3777',
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
            res.on('data', function(chunk) {
                console.log('some data come');
                msg += chunk;
            });
            res.on('end', function() {
                //  msg.replace('[','\'');
                //msg.replace(']','\'');
                //  var  msg1=msg.replace("[","").replace("]","");
                var msg1 = msg.toString();
                resolve(msg1);

            });

        });
        req.write(data);
        req.end();
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