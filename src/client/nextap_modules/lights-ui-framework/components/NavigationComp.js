//import React, { Component } from 'react';
import React from "react";
import { SplitButton, Button, ButtonToolbar, Collapse, Well, MenuItem } from 'react-bootstrap';

import { Navbar, Nav, NavItem, NavDropdown } from 'react-bootstrap';
//import { Form, FormGroup, ControlLabel, FormContro, Alert } from 'react-bootstrap';
import './MyElement.css';
import LoadingButton from './LoadingButton';

import LightAssignmentComp from "./LightAssignmentComp";
import GroupAssignment from "./GroupAssignment";
import PassWordComp from "./PasswordComp";
import LightsStore from "../stores/LightsStore";
import SceneComp from "./SceneComp";
import SequenceControlComp from "./SequenceControlComp";


class NavigationComp extends React.Component {
    constructor(props) {
        super(props);
        this.renderType = "";
        this.state = {
            poll: props.poll,
            group: props.group
        };
        this.setWellForPassWord = this.setWellForPassWord.bind(this);
        this.setWellForLightIdAssignment = this.setWellForLightIdAssignment.bind(this);
        this.setWellForGroupIdAssignment = this.setWellForGroupIdAssignment.bind(this);
        this.setWellForSceneSetting = this.setWellForSceneSetting.bind(this);
        this.setWellForSequenceControl = this.setWellForSequenceControl.bind(this);
    }


    componentWillMount() {
    }
    componentWillUnmount() {
    }

    componentWillReceiveProps(nextProps) {
        console.log("GroupAssignment CompF componentWillReceiveProps");
        this.setState({
            group: nextProps.group,
            poll: nextProps.poll
        });
    }

    setWellForPassWord() {
        this.renderType = "Password Setting";
        // this.changeCollapse();
        this.setState({ open1: !this.state.open1 });
    }

    setWellForLightIdAssignment() {
        this.renderType = "Light ID Assignment";
        //this.changeCollapse();
        this.setState({ open2: !this.state.open2 });
    }

    setWellForGroupIdAssignment() {
        this.renderType = "Group Assignment";
        //this.changeCollapse();
        this.setState({ open3: !this.state.open3 });

    }

    setWellForSceneSetting() {
        this.renderType = "Scene Setting";
        this.setState({
            open4: !this.state.open4
        });
    }

    setWellForSequenceControl() {
        this.renderType = "Sequence Control";
        this.setState({
            open5: !this.state.open5
        });
    }




    // getWellInhalt() {
    //     console.log('get well inhalt:' + this.renderType);
    //     switch (this.renderType) {
    //         case "Password Setting":
    //             return <PassWordComp />;
    //             break;
    //         case "Light ID Assignment":
    //             return <LightAssignmentComp />;
    //             break;
    //         case "Group Assignment":
    //             return <GroupAssignment />;
    //             break;
    //     }

    // }


    render() {
        return (
            <div>
                {/*<div className="TitleStyle">
            <h2> <strong>Light Web Applikation</strong> </h2>
           </div>*/}

                <Navbar inverse collapseOnSelect className="navbar">
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#">Light-Client</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <NavItem eventKey={1} href="#" onClick={this.setWellForPassWord}>Password Setting</NavItem>
                            <NavItem eventKey={2} href="#" onClick={this.setWellForLightIdAssignment}>Light ID Assignment</NavItem>
                            <NavItem eventKey={3} href="#" onClick={this.setWellForGroupIdAssignment}>Group Assignment</NavItem>
                        </Nav>
                        <Nav pullRight>
                            <NavItem eventKey={4} href="#" onClick={this.setWellForSceneSetting}>Scene Setting</NavItem>
                            <NavItem eventKey={5} href="#" onClick={this.setWellForSequenceControl}>Sequence Control</NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                <Collapse in={this.state.open1} >
                    <div>
                        <Well className="well">
                            <PassWordComp />
                        </Well>

                    </div>
                </Collapse>

                <Collapse in={this.state.open2} >
                    <div>
                        <Well className="well">
                            <LightAssignmentComp poll={this.state.poll} />
                        </Well>

                    </div>
                </Collapse>

                <Collapse in={this.state.open3} >
                    <div>
                        <Well className="well">
                            <GroupAssignment group={this.state.group} poll={this.state.poll} />
                        </Well>

                    </div>
                </Collapse>

                <Collapse in={this.state.open4} >
                    <div>
                        <Well className="well">
                            <SceneComp group={this.state.group} />
                        </Well>

                    </div>
                </Collapse>


                <Collapse in={this.state.open5} >
                    <div>
                        <Well className="well">
                            <SequenceControlComp />
                        </Well>
                    </div>
                </Collapse>

            </div>
        )
    }

}
export default NavigationComp;