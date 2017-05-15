//import React, { Component } from 'react';
import React from "react";
import './MyElement.css';
import { SplitButton, Button, ButtonToolbar, Collapse, Well, MenuItem } from 'react-bootstrap';
import LoadingButton from './LoadingButton';
import { Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';


class GroupAssignment extends React.Component {

    constructor(props) {
        super(props);
        console.log('GroupAssignment');
        this.handleSelectMenu = this.handleSelectMenu.bind(this);
        this.handleGroup = this.handleGroup.bind(this);
        this.getGroupMenuItem = this.getGroupMenuItem.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        var group = props.group;
        var poll = props.poll;
        // pollInfo = {
        //     "00130418ccd2": "L01",
        //     "00130418cc94": "L02",
        //     "00130418cd31": "L03"
        // }
        this.state = {
            group: group,
            poll: poll,
            splitDropDownTitle: "Avaliable Light",
            textValue: ""
        };
    }

    componentWillReceiveProps(nextProps) {
        console.log("GroupAssignment CompF componentWillReceiveProps");
        this.setState({
            group: nextProps.group,
            poll: nextProps.poll
        });
    }

    getDropDownMenuItem() {
        var poll = this.state.poll;
        var menu = [];
        for (var item in poll) {
            var lightId = poll[item];
            lightId = parseInt(lightId, 16);
            if (lightId < 10) {
                lightId = "0" + lightId;
            }
            menu.push(<MenuItem eventKey={lightId}>{"BDADDR:" + item + ", ID:" + lightId}</MenuItem>);
        }
        return menu;

    }

    handleSelectMenu(evtKey, object) {
        this.setState({
            splitDropDownTitle: "Light ID:" + evtKey
        });
    }

    handleGroup(evtKey) {
        var key = parseInt(evtKey, 10);
        this.setState({
            textValue: key
        })
    }

    getGroupMenuItem() {
        var group = this.state.group;
        var menu = [];
        for (var item in group) {
            //G01
            var info = group[item];
            info = info.substring(1);
            var decID = parseInt(info, 16);
            if (decID < 10) {
                decID = "0" + decID;
            }
            menu.push(<MenuItem eventKey={decID}>{"G" + decID}</MenuItem>)
        }
        return menu;

    }


    handleTextChange(event) {
        var valueString = event.target.value;
        if (valueString.length != 0) {
            this.setState({ textValue: valueString });
        } else {
            this.setState({ textValue: "" });
        }

    }

    render() {
        return (
            <div>
                <h3><strong>Group Assignment</strong></h3>
                <Form inline>
                    <SplitButton bsStyle="primary" title="Exist Groups" id="DropDown-LightId-Selector3" onSelect={this.handleGroup}>
                        <MenuItem>Select Group ID or create new Group ID</MenuItem>
                        <MenuItem divider />
                        {this.getGroupMenuItem()}
                    </SplitButton>
                    <FormGroup controlId="formInlinePassword" className="fromGroup">
                        <ControlLabel>Group ID:</ControlLabel>
                        {' '}
                        <FormControl type="text" placeholder="Only from 1-64" value={this.state.textValue} onChange={this.handleTextChange} />
                    </FormGroup>
                    {' '}

                    <SplitButton bsStyle="primary" title={this.state.splitDropDownTitle} id="DropDown-LightId-Selector2" onSelect={this.handleSelectMenu}>
                        <MenuItem>Select Light to assign into Group</MenuItem>
                        <MenuItem divider />
                        {this.getDropDownMenuItem()}
                    </SplitButton>



                    <LoadingButton styleName="success" loadingName="Changing" normalName=" Group Assignment" clickCommand={{ command: "group_assign", groupid: this.state.textValue, id: this.state.splitDropDownTitle }} />
                    <LoadingButton styleName="success" loadingName="Changing" normalName="Delete Group" clickCommand={{ command: "group_delete", groupid: this.state.textValue }} />
                    {/*<Button bsStyle="info" className="newButton" onClick={() => this.setState({ open: !this.state.open })}>Tipps</Button>*/}
                </Form>
            </div>
        );
    }
}

export default GroupAssignment;