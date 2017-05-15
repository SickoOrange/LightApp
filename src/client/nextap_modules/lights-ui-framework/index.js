import React from 'react';

import Lights from "./components/Lights";
import "./sass/main.scss";
import * as LightActions from "./actions/LightsActions"
import LightsStore from "./stores/LightsStore";


import NavigationComp from "./components/NavigationComp";
import LightAssignmentComp from "./components/LightAssignmentComp"
import GroupAssignment from "./components/GroupAssignment";
import PasswordComp from "./components/PasswordComp";

export default class CustomComponent extends React.Component {
    constructor(props) {
        super(props);
        this.getGroups = this.getGroups.bind(this);
        this.state = null;
    }

    componentWillMount() {
        //regist listener
        LightsStore.on("changeGroups", this.getGroups);
        //Group polling
        LightActions.pollGroups();
    }

    getGroups() {
        console.log("getGroups");
        this.setState({
            groups: LightsStore.getGroups()
        });
    }

    generateGroup() {
        var groups = this.state.groups;
        return groups.map(function (group) {
            //add group id as prop to Lights in the feature

            if (typeof group === "string") {
                return <Lights groupid={group} />;
            }

        });
    }

    render() {

        if (!this.state) {
            return null;
        }

        var group = this.generateGroup();
        var groups = this.state.groups;
        var groupArray = [];
        groups.map(function (group) {
            if (typeof group === "string") {
                groupArray.push(group);
            }
        })
        return (
            <div>

                <div class="text-center">
                    <NavigationComp group={groupArray} poll={groups[groups.length - 1]}></NavigationComp>
                </div>
                {group}
            </div>
        );
    }
}
