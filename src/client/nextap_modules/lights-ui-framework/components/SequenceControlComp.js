import React from "react";
import './MyElement.css';
import { SplitButton, Button, ButtonToolbar, Collapse, Well, MenuItem } from 'react-bootstrap';
import LoadingButton from './LoadingButton';
import { Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

class SequenceControlComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleSelectedSequenceIDTextChange = this.handleSelectedSequenceIDTextChange.bind(this);
        this.handleScenesTextChange = this.handleScenesTextChange.bind(this);
        this.handleFadeTimeTextChange = this.handleFadeTimeTextChange.bind(this);
        this.handleSceneTimeTextChange = this.handleSceneTimeTextChange.bind(this);
        this.handlePickedsequenceIDTextChange = this.handlePickedsequenceIDTextChange.bind(this);
    }

    handleSelectedSequenceIDTextChange(event) {
        var valueString = event.target.value;
        if (valueString.length != 0) {
            this.setState({ selectedSequenceID: valueString });
        } else {
            this.setState({ selectedSequenceID: "" });
        }
    }



    handleScenesTextChange(event) {
        var valueString = event.target.value;
        if (valueString.length != 0) {
            this.setState({ scenes: valueString });
        } else {
            this.setState({ scenes: "" });
        }

    }

    handleFadeTimeTextChange(event) {
        var valueString = event.target.value;
        if (valueString.length != 0) {
            this.setState({ fadeTime: valueString });
        } else {
            this.setState({ fadeTime: "" });
        }

    }

    handleSceneTimeTextChange(event) {
        var valueString = event.target.value;
        if (valueString.length != 0) {
            this.setState({ sceneTime: valueString });
        } else {
            this.setState({ sceneTime: "" });
        }

    }
    handlePickedsequenceIDTextChange(event) {
        var valueString = event.target.value;
        if (valueString.length != 0) {
            this.setState({ pickedsequenceID: valueString });
        } else {
            this.setState({ pickedsequenceID: "" });
        }
    }


    render() {
        return (
            <div>

                <div>
                    <h3><strong>Sequence Setting</strong></h3>
                    <Form inline>
                        <FormGroup controlId="formInlinePassword" className="fromGroup">
                            <ControlLabel>Select Sequence:</ControlLabel>
                            {' '}
                            <FormControl type="text" placeholder="Only from 1-5" value={this.state.selectedSequenceID} onChange={this.handleSelectedSequenceIDTextChange} />
                        </FormGroup>
                        {' '}

                        <FormGroup controlId="formInlinePassword" className="fromGroup">
                            <ControlLabel>Scene Time:</ControlLabel>
                            {' '}
                            <FormControl type="text" placeholder="Only from 0-3600s" value={this.state.sceneTime} onChange={this.handleSceneTimeTextChange} />
                        </FormGroup>
                        {' '}


                        <FormGroup controlId="formInlinePassword" className="fromGroup">
                            <ControlLabel>Fade Time:</ControlLabel>
                            {' '}
                            <FormControl type="text" placeholder="Only from 0-255s" value={this.state.fadeTime} onChange={this.handleFadeTimeTextChange} />
                        </FormGroup>
                        {' '}

                        <FormGroup controlId="formInlinePassword" className="fromGroup">
                            <ControlLabel>Add Scenes:</ControlLabel>
                            {' '}
                            <FormControl type="text" placeholder="ID separated by , like 1,2,3" value={this.state.scenes} onChange={this.handleScenesTextChange} />
                        </FormGroup>
                        {' '}


                        <LoadingButton styleName="success" loadingName="Changing" normalName="Save Sequence" clickCommand={{ command: "sequenceControl_save", sequenceID: this.state.selectedSequenceID, sceneTime: this.state.sceneTime, fadeTime: this.state.fadeTime, Scenes: this.state.scenes }} />
                    </Form>
                </div>
                <h3><strong>Start or stop sequence</strong></h3>
                <div>
                </div>
                <div>
                    <Form inline>
                        <FormGroup controlId="formInlinePassword" className="fromGroup">
                            <ControlLabel>Sequence ID:</ControlLabel>
                            {' '}
                            <FormControl type="text" placeholder="Only from 1-5" value={this.state.pickedsequenceID} onChange={this.handlePickedsequenceIDTextChange} />
                        </FormGroup>
                        {' '}
                        <LoadingButton styleName="success" loadingName="Changing" normalName="Start Sequece" clickCommand={{ command: "sequenceControl_start", sequenceID: this.state.pickedsequenceID }} />
                        <LoadingButton styleName="success" loadingName="Changing" normalName="Stop Sequece" clickCommand={{ command: "sequenceControl_stop", sequenceID: this.state.pickedsequenceID }} />
                    </Form>
                </div>
            </div>
        );
    }


}

export default SequenceControlComp;