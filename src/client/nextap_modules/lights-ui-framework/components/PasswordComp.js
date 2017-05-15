//import React, { Component } from 'react';
import React from "react";
import './MyElement.css';
import { Button, Collapse, Well } from 'react-bootstrap';
import LoadingButton from './LoadingButton';
import { Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import LightAssignmentComp from "./LightAssignmentComp";
import NavigationComp from "./NavigationComp";
import * as LightsActions from "../actions/LightsActions";

class PasswordComp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(event) {
        var valueString = event.target.value;
        if (valueString.length != 0) {
            this.setState({ pw: valueString });
        } else {
            this.setState({ pw: "" });
        }
    }

    render() {
        return (
            <div>
                   <h3><strong>Password Setting</strong></h3>
                <Form inline >
                    <FormGroup controlId="formInlinePassword" className="fromGroup">
                        <ControlLabel>Remote Password:</ControlLabel>
                        {' '}
                        <FormControl type="text" placeholder="only remote password" value={this.state.pw} onChange={this.handleChange} />
                    </FormGroup>
                    {' '}
                    
                    <LoadingButton styleName="success" loadingName="Changing" normalName="Change Remote" clickCommand={{ command: "password_remote", pw: this.state.pw }} />
                    < LoadingButton styleName="success" loadingName="Changing" normalName="Change Local" clickCommand={{ command: "password_local" }} />
                    {/*<Button bsStyle="danger" className="newButton" onClick={LightsActions.closeTab(this.props.Tag)} >Close Tab</Button>*/}
                </Form>
            </div>
        );
    }
}


export default PasswordComp;
