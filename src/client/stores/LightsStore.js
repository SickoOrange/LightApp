import {EventEmitter} from "events";

import dispatcher from "../dispatcher";

class LightsStore extends EventEmitter {
    constructor() {
        super();
    }

    getLights() {
        return this.lights;
    }

    handleActions(action) {
        switch (action.type) {
            case "RECEIVE_LIGHTS":
            {
                if (action.lights) {
                    this.lights = action.lights;
                    this.emit("changeLights");
                }
                break;
            }
        }
    }
}

const lightsStore = new LightsStore;
dispatcher.register(lightsStore.handleActions.bind(lightsStore));

export default lightsStore;