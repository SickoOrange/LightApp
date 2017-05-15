import dispatcher from "../dispatcher";
var http = require('http');


export function pollGroups() {
    console.log("poll all group!");
    var apiUrl = "/lights/pollgroups/"
    $.ajax({
        method: 'GET',
        url: apiUrl,
        crossDomain: true,
        crossOrigin: true,
        dataType: 'json'
    }).done(groups => {
        console.log("ajax: groups:" + groups);
        dispatcher.dispatch({
            type: 'RECEIVE_GROUPS',
            groups: groups
        });
    })
        .fail(jqXhr => {
            console.log("poll all group: ajax request error: " + JSON.stringify(jqXhr));
        });

}


export function reloadGroupLights(groupid) {
    console.log(' ready to get lights from group: ' + groupid);
    var apiUrl = "/lights/pollgrouplights/"
    var id = groupid;
    if (groupid)
        apiUrl += groupid;
    $.ajax({
        method: 'GET',
        url: apiUrl,
        crossDomain: true,
        crossOrigin: true,
        dataType: 'json'
    }).done(groupLights => {
        //groupLights.push(id);
        for (var index in groupLights) {
            groupLights[0].groupid = id;
        }
        dispatcher.dispatch({
            type: 'RECEIVE_GROUPLIGHTS',
            groupLights: groupLights
        });
    })
        .fail(jqXhr => {
            console.log("poll group lights: ajax request error: " + JSON.stringify(jqXhr));
        });

}

export function reloadLights(deviceID) {
    var apiUrl = '/lights/';
    if (deviceID)
        apiUrl += deviceID;
    $.ajax({
        method: 'GET',
        url: apiUrl,
        crossDomain: true,
        crossOrigin: true,
        dataType: 'json'
    })
        .done(lights => {
            console.log("reload lights successfully");
            console.log(lights);
            dispatcher.dispatch({
                type: 'RECEIVE_LIGHTS',
                lights: lights
            });
        })
        .fail(jqXhr => {
            console.log('AJAX request error: ' + JSON.stringify(jqXhr));
        });
}


export function logMe() {
    console.log('select dropdown ');
}


export function setMe() {

    console.log('ready to send my http request to server:')
}

export function setDimmLight(data) {
    var apiUrl = '/lights/dimm';
    if (data.dimm === "") {
        alert("Dimm value cannot be null!")
        return;
    }

    var id = data.groupid;
    data.groupid = id.substring(1, id.length);
    return $.ajax({
        method: "POST",
        url: apiUrl,
        contentType: 'application/json',
        data: JSON.stringify(data),
    }).done(
        // need to refresh the new light dimm value,
        dimmRes => {
            //alert("change dimm value successfully");
            dispatcher.dispatch({
                type: 'DIMM_EVENT',
                dimmRes: dimmRes
            });

        }).fail(jqXhr => {
            console.log("AJAX req error: " + JSON.stringify(jqXhr));
        });
}

export function setBlink(data) {
    var apiUrl = '/lights/blink';
    $.ajax({
        method: "POST",
        url: apiUrl,
        contentType: 'application/json',
        data: JSON.stringify(data)
    }).done(
        //todo need to refresh the new light dimm value,
        //wenn the blink, the dimm value of the lights has changed.
        blinkRes => {
            console.log('ajax blink events');
            dispatcher.dispatch({
                type: 'BLINK_EVENT',
                blinkInfo: blinkRes
            });
        }
        ).fail(jqXhr => {
            console.log("setBlink AJAX req error: " + JSON.stringify(jqXhr));
        });
}

export function passwordSetting(data) {
    var apiUrl = '/lights/PasswordSetting';
    $.ajax({
        method: "POST",
        url: apiUrl,
        contentType: 'application/json',
        data: JSON.stringify(data)
    }).done(
        passwordRes => {
            dispatcher.dispatch(
                {
                    type: 'PASSWORD_EVENT',
                    pwRes: passwordRes
                }
            );
        }

        ).fail(jqXhr => {
            console.log("passwordSetting AJAX req error: " + JSON.stringify(jqXhr));
        });
}

export function handleIdentification(data) {
    var apiUrl = '/lights/Identification';
    $.ajax({
        method: "POST",
        url: apiUrl,
        contentType: 'application/json',
        data: JSON.stringify(data)
    }).done(
        identificationRes => {
            console.log('identification: ' + identificationRes);
            dispatcher.dispatch(
                {
                    type: 'IDENTIFICATION_EVENT',
                    identificationRes: identificationRes
                }
            );
        }

        ).fail(jqXhr => {
            console.log("Identification AJAX req error: " + JSON.stringify(jqXhr));
        });
}

export function groupHandle(data) {
    var apiUrl = '/lights/groupHandle';
    $.ajax({
        method: "POST",
        url: apiUrl,
        contentType: 'application/json',
        data: JSON.stringify(data)
    }).done(
        groupHandleRes => {
            console.log('groupHandle: ' + JSON.stringify(groupHandleRes));
            if (groupHandleRes.command) {
                console.log(groupHandleRes.command);

            } else {
                alert('groupExist: true');
            }

            dispatcher.dispatch(
                {
                    type: 'GROUPHANDLE_EVENT',
                    groupHandleRes: groupHandleRes
                }
            );
        }

        ).fail(jqXhr => {
            console.log("groupHandle AJAX req error: " + JSON.stringify(jqXhr));
        });
}


export function sceneHandle(data) {
    var apiUrl = '/lights/sceneHandle';
    $.ajax({
        method: "POST",
        url: apiUrl,
        contentType: 'application/json',
        data: JSON.stringify(data)
    }).done(
        sceneHandleRes => {
            console.log('sceneHandle: ' + JSON.stringify(sceneHandleRes));

            dispatcher.dispatch(
                {
                    type: 'SCENEHANDLE_EVENT',
                    sceneHandleRes: sceneHandleRes
                }
            );
        }

        ).fail(jqXhr => {
            console.log("sceneHandle AJAX req error: " + JSON.stringify(jqXhr));
        });

}

export function sequenceHandle(data) {
    var apiUrl = '/lights/sequenceHandle';
    $.ajax({
        method: "POST",
        url: apiUrl,
        contentType: 'application/json',
        data: JSON.stringify(data)
    }).done(
        sequenceHandleRes => {
            console.log('sequenceHandle: ' + JSON.stringify(sequenceHandleRes));

            dispatcher.dispatch(
                {
                    type: 'SEQUENCEHANDLE_EVENT',
                    sequenceHandleRes: sequenceHandleRes
                }
            );
        }

        ).fail(jqXhr => {
            console.log("sequenceHandle AJAX req error: " + JSON.stringify(jqXhr));
        });


}



