import React from "react";

import * as LightsActions from "../actions/LightsActions";
import LightsStore from "../stores/LightsStore";
import Light from "./Light";

export default class Lights extends React.Component {
    constructor() {
        super();
        this.getLights = this.getLights.bind(this);
        this.state = null;
        LightsActions.reloadLights();
    }

    componentWillMount() {
        LightsStore.on("changeLights", this.getLights);
    }

    componentWillUnmount() {
        LightsStore.removeListener("changeLights", this.getLights);
    }

    getLights() {
        this.setState({
            lights: LightsStore.getLights()
        });
    }

    generateLights() {
        var lights = this.state.lights;
        return lights.map(function (light) {
            return <Light type="light" light={light}></Light>
        });
    }

    render() {
        if (!this.state)
            return null;

        var content = this.generateLights();

        return (
            <div className="page-lights">
                <div className="contentWrapper">{content}</div>
            </div>
        );
    }
}