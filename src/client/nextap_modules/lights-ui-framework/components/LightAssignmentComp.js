//import React, { Component } from 'react';
import React from "react";
import './MyElement.css';
import { SplitButton, Button, ButtonToolbar, Collapse, Well, MenuItem } from 'react-bootstrap';
import LoadingButton from './LoadingButton';
import { Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import LightsStore from "../stores/LightsStore";


class LightAssignmentComp extends React.Component {

    constructor(props) {
        super(props);
        this.handleSelectMenu = this.handleSelectMenu.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.identificationResEvent = this.identificationResEvent.bind(this);
        var lightsInfo = props.poll;
        // lightsInfo={
        //     "00130418ccd2": "01",
        //     "00130418cc94": "02",
        //     "00130418cd31": "03"
        // }
        this.state = {
            info: lightsInfo,
            splitDropDownTitle: "Light ID"
        };
    }


    componentWillMount() {
        LightsStore.on("identificationResEvent", this.identificationResEvent);
    }
    componentWillUnmount() {
        LightsStore.remove("identificationResEvent", this.identificationResEvent);
    }

    identificationResEvent() {
        var identificationRes = LightsStore.getIdentificationRes();
        var pollInfo = this.props.poll;
        pollInfo[identificationRes.bdaddr] = identificationRes.id;
        if (identificationRes) {
            this.setState({ info: pollInfo });
        }
    }

    getDropDownMenuItem() {
        var info = this.state.info;
        var menu = [];
        console.log(info);
        for (var item in info) {
            var lightId = info[item];
            menu.push(<MenuItem eventKey={item}>{"BDADDR: " + item + ", ID:" + lightId}</MenuItem>);
        }
        return menu;

    }

    // componentWillReceiveProps(nextProps) {
    //     this.state = {
    //         info: nextProps.poll
    //     };
    // }

    handleSelectMenu(evtKey, object) {
        this.setState({
            splitDropDownTitle: "BDADDR:" + evtKey
        });
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
        console.log('render LightAssignmentComp');
        return (
            <div>
                   <h3><strong>Light ID Assignment</strong></h3>
                <Form inline>
                    <SplitButton bsStyle="primary" title={this.state.splitDropDownTitle} id="DropDown-LightId-Selector1" onSelect={this.handleSelectMenu}>
                        <MenuItem>Select Light to assignment ID</MenuItem>
                        <MenuItem divider />
                        {this.getDropDownMenuItem()}
                    </SplitButton>

                    <FormGroup controlId="formInlinePassword" className="fromGroup">
                        <ControlLabel>Light ID:</ControlLabel>
                        {' '}
                        <FormControl type="text" placeholder="ID only from 0-191" value={this.state.textValue} onChange={this.handleTextChange} />
                    </FormGroup>
                    {' '}

                    <LoadingButton styleName="success" loadingName="Changing" normalName=" ID Assignment" clickCommand={{ command: "identification_assign", bdaddr: this.state.splitDropDownTitle, id: this.state.textValue }} />
                    <LoadingButton styleName="success" loadingName="Changing" normalName="Clear Memory" clickCommand={{ command: "identification_clear", bdaddr: this.state.splitDropDownTitle }} />
                    {/*<Button bsStyle="info" className="newButton" onClick={() => this.setState({ open: !this.state.open })}>Tipps</Button>*/}
                </Form>
            </div>
        );
    }
}

export default LightAssignmentComp;