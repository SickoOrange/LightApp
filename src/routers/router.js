"use strict"
var R = require("../R");

var express = require('express');
var router = express.Router();

var LightsController = require("../controllers/lightsController").construct;
var lightsController = new LightsController();

var groupId = "";
var commandPoll = [];


router.get('/lights/pollgroups', function (req, res, next) {
    console.log('ready poll groups');
    lightsController.getGroups().then(
        function (groups) {
            lightsController.getPoll().then(
                function (data) {
                    console.log("poll")
                    commandPoll = data;
                    // var lightsInfo = {
                    //     "00130418ccd2": "01",
                    //     "00130418cc94": "02",
                    //     "00130418cd31": "03"
                    // }
                    groups.push(data);
                    R.utils.responseView(R.toResponse(200, null, groups, null, null), res, next);
                }
            );
        }
    );
});


router.get('/lights/pollgrouplights/:id', function (req, res, next) {
    console.log('ready poll group lights with id: ' + req.params.id);
    lightsController.getGroupLights(req.params.id).then(
        function (groupLights) {

            groupLights.map(function (light) {
                var id = light.ID.substring(1, light.ID.length);
                var BDADDR = "";
                for (var prop in commandPoll) {
                    if (id === commandPoll[prop]) {
                        BDADDR = prop;
                    }
                }
                light.BDADDR = BDADDR;
            });
            console.log("command poll: " + JSON.stringify(groupLights));
            R.utils.responseView(R.toResponse(200, null, groupLights, null, null), res, next);

        }
    );
});

router.get('/lights', function (req, res, next) {
    console.log('router function');
    lightsController.getLights()
        .then(function (lights) {
            console.log('router light -> ' + lights);
            R.utils.responseView(R.toResponse(200, null, lights, null, null), res, next);

        });
});




router.get('/lights/:id', function (req, res, next) {
    lightsController.getLight(req.params.id)
        .then(function (light) {
            R.utils.responseView(R.toResponse(200, null, light, null, null), res, next);
        });
});



router.post('/lights/blink', function (req, res, next) {
    lightsController.setBlink(req.body).then(
        function (blinkRes) {
            console.log("blink response: " + JSON.stringify(blinkRes));
            R.utils.responseView(R.toResponse(200, null, blinkRes, null, null), res, next);
        }
    );
})

router.post('/lights/dimm', function (req, res, next) {
    lightsController.setDimmLight(req.body).then(
        function (dimmRes) {
            console.log("dimm response: " + JSON.stringify(dimmRes));
            R.utils.responseView(R.toResponse(200, null, dimmRes, null, null), res, next);
        }
    );
})



router.post('/lights/PasswordSetting', function (req, res, next) {
    lightsController.passwordSetting(req.body).then(
        pwRes => {
            R.utils.responseView(R.toResponse(200, null, pwRes, null, null), res, next);
        });

});


router.post('/lights/Identification', function (req, res, next) {
    lightsController.identification(req.body).then(
        identificationRes => {
            R.utils.responseView(R.toResponse(200, null, identificationRes, null, null), res, next);
        });

});

router.post('/lights/groupHandle', function (req, res, next) {
    lightsController.groupHandle(req.body).then(
        groupHandleRes => {
            R.utils.responseView(R.toResponse(200, null, groupHandleRes, null, null), res, next);
        });

});

router.post('/lights/sceneHandle', function (req, res, next) {
    lightsController.sceneHandle(req.body).then(
        sceneHandleRes => {
            R.utils.responseView(R.toResponse(200, null, sceneHandleRes, null, null), res, next);
        }
    );


});

router.post('/lights/sequenceHandle', function (req, res, next) {

    lightsController.sequenceHandle(req.body).then(
        sequenceHandleRes => {
            R.utils.responseView(R.toResponse(200, null, sequenceHandleRes, null, null), res, next);
        }
    );
});





exports = module.exports = router;
