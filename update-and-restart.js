'use strict';

var exec = require('child_process').exec;
let Promise = global.Promise;

function executeCommand(command, startMessage, endMessage) {
    return new Promise(function (resolve, reject) {
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
                    reject(error);
                } else {
                    log(endMessage);
                    resolve();
                }
            });
    });
}

function startServer() {
    return executeCommand('node startServer.js', 'Starting server', "Server is running");
}

function stopServer(callback) {
    return executeCommand('node stopServer.js', 'Stopping server', "Server was stopped");
}

function gitPull(callback) {
    return executeCommand('git pull', 'Start downloading a changes', "Download done");
}

function migrateDB(callback) {
    return new Promise(function (resolve, reject) {    
        // TODO: add migrate scripts
    	resolve();
    });
}

stopServer()
.catch(function (err) {
    console.log(err);
    return 1;
})
.then(gitPull)
.then(migrateDB)
.then(startServer)
.then(function () {
    console.log("Done");
})
.catch(function (err) {
    console.log(err);
});
