import dispatcher from "../dispatcher";
const apiUrl = ''; // TODO

export function reloadLights() {
    $.ajax({
        method: 'GET',
        url: apiUrl + '/lights',
        crossDomain: true,
        crossOrigin: true,
        dataType: 'json'
    })
        .done(lights => {
            dispatcher.dispatch({
                type: 'RECEIVE_LIGHTS', lights: lights
            });
        })
        .fail(jqXhr => {
            console.log('AJAX request error: ' + JSON.stringify(jqXhr));
        });
}

export function setLight(data) {
    return $.ajax({
        method: "PUT",
        url: apiUrl + '/lights',
        contentType: 'application/json',
        data: JSON.stringify(data),
    }).done(data => {
        reloadLights();
    }).fail(jqXhr => {
        console.log("AJAX req error: " + JSON.stringify(jqXhr));
    });
}
