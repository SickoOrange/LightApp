import React from "react";

import * as LightsActions from "../actions/LightsActions";
import LightsStore from "../stores/LightsStore";
import Light from "./Light";

export default class Lights extends React.Component {
    constructor(props) {
        super(props);
        // this.getLights = this.getLights.bind(this);
        this.getGroupLights = this.getGroupLights.bind(this);
        var groupid = this.props.groupid;
        console.log("lights constructor groupid:" + groupid);
        // this.state = {
        //    groupid: groupid
        // };
        this.state = null;
    }

    componentWillMount() {
        //LightsStore.on("changeLights", this.getLights);
        // LightsActions.reloadLights(this.props.deviceID);

        LightsStore.on("changeGroupLights", this.getGroupLights)
        LightsActions.reloadGroupLights(this.props.groupid);
    }

    componentWillUnmount() {
        // LightsStore.removeListener("changeLights", this.getLights);
        LightsStore.removeListener("changeGroupLights", this.getGroupLights);
    }

    componentWillReceiveProps(nextProps) {
        console.log("Lights componentWillReceiveProps");
        // this.setState({
        //     groupid: nextProps.groupid
        // });
        LightsActions.reloadGroupLights(this.props.groupid);
    }

    // getLights() {
    //     console.log("getLights");
    //     this.setState({
    //         lights: LightsStore.getLights()
    //     });
    // }

    getGroupLights() {
        var lights = LightsStore.getLights();
        console.log("getgrouplights: " + JSON.stringify(lights));
        // var getGroupId = arr[arr.length - 1];
        // if (getGroupId === this.props.groupid) {
        //     var lightsArr = [];
        //     for (var i = 0; i < arr.length - 1; i++) {
        //         lightsArr.push(arr[i]);
        //     }
        //     this.setState({
        //         groupLights: lightsArr
        //     });
        // }
        var needRefresh = false;
        for (var index in lights) {
            if (lights[index].groupid === this.props.groupid) {
                needRefresh = true;
            } else {
                needRefresh = false;
            }
        }
        if (needRefresh) {
            console.log("need refresh: " + this.props.groupid);
            this.setState({
                groupLights: lights
            });
        }

    }

    generateLights() {
        var groupLights = this.state.groupLights;
        return groupLights.map(function (light) {
            return <Light light={light} />

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