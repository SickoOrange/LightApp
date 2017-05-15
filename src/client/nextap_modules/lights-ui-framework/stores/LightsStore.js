import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class LightsStore extends EventEmitter {
    constructor() {
        super();
    }

    getLights() {
        return this.lights;
    }

    getGroups() {
        return this.groups;
    }

    getBlinkRes() {
        return this.blinkRes;
    }


    getPasswordRes() {
        return this.pwRes;
    }

    getDimmRes() {
        return this.dimmRes;
    }

    getCustomClassType() {
        return this.customClassType;
    }

    getIdentificationRes() {
        return this.identificationRes;
    }

    getGroupHandleRes() {
        return this.groupHandleRes;
    }

    getSceneHandleRes() {
        return this.sceneHandleRes;
    }

    getSequenceHandleRes() {
        return this.sequenceHandleRes;
    }


    handleActions(action) {
        switch (action.type) {

            case "RECEIVE_GROUPS":
                {
                    if (action.groups) {
                        this.groups = action.groups;
                        this.emit("changeGroups");
                    }
                    break;
                }


            case "RECEIVE_GROUPLIGHTS":
                {
                    if (action.groupLights) {
                        this.lights = action.groupLights;
                        this.emit("changeGroupLights");
                    }
                    break;
                }

            case "BLINK_EVENT":
                {
                    if (action.blinkInfo) {
                        this.blinkRes = action.blinkInfo;
                        this.emit("blinkEvent");
                    }
                    break;
                }

            case "DIMM_EVENT":
                {
                    if (action.dimmRes) {
                        this.dimmRes = action.dimmRes;
                        this.emit("dimmEvent");
                    }
                    break;
                }

            case "PASSWORD_EVENT":
                {
                    if (action.pwRes) {
                        this.pwRes = action.pwRes;
                        this.emit("passwordEvent");
                    }
                    break;
                }

            case "IDENTIFICATION_EVENT":
                {
                    if (action.identificationRes) {
                        this.identificationRes = action.identificationRes;
                        this.emit("identificationResEvent");
                    }
                    break;
                }


            case "GROUPHANDLE_EVENT":
                {
                    if (action.groupHandleRes) {
                        this.groupHandleRes = action.groupHandleRes;
                        this.emit("groupHandleResEvent");
                    }
                    break;
                }

            case "SCENEHANDLE_EVENT":
                {
                    if (action.sceneHandleRes) {
                        this.sceneHandleRes = action.sceneHandleRes;
                        this.emit("sceneHandleResEvent");
                    }
                    break;
                }

            case "SEQUENCEHANDLE_EVENT":
                {
                    if (action.sequenceHandleRes) {
                        this.sequenceHandleRes = action.sequenceHandleRes;
                        this.emit("sequenceHandleResEvent");
                    }
                    break;
                }

        }
    }
}

const lightsStore = new LightsStore;
dispatcher.register(lightsStore.handleActions.bind(lightsStore));

export default lightsStore;