import React from "react";
import './MyElement.css';
import { SplitButton, Button, ButtonToolbar, Collapse, Well, MenuItem } from 'react-bootstrap';
import LoadingButton from './LoadingButton';
import { Form, FormGroup, ControlLabel, FormControl, Pager } from 'react-bootstrap';


class SceneComp extends React.Component {
    constructor(props) {
        super(props);
        var group = this.props.group;
        this.state = { group: group };
        this.handleGroupIdTextChange = this.handleGroupIdTextChange.bind(this);
        this.handleSceneIdTextChange = this.handleSceneIdTextChange.bind(this);
        this.handleGroup = this.handleGroup.bind(this);
        this.getGroupMenuItem = this.getGroupMenuItem.bind(this);
        this.handleRecallIDTextChange = this.handleRecallIDTextChange.bind(this);
        this.handleDeleteIDTextChange = this.handleDeleteIDTextChange.bind(this);
    }
    handleDeleteIDTextChange(event) {
        var valueString = event.target.value;
        if (valueString.length != 0) {
            this.setState({ deleteID: valueString });
        } else {
            this.setState({ deleteID: "" });
        }
    }

    handleGroupIdTextChange(event) {
        var valueString = event.target.value;
        if (valueString.length != 0) {
            this.setState({ groupid: valueString });
        } else {
            this.setState({ groupid: "" });
        }

    }

    handleSceneIdTextChange(event) {
        var valueString = event.target.value;
        if (valueString.length != 0) {
            this.setState({ sceneid: valueString });
        } else {
            this.setState({ sceneid: "" });
        }

    }
    handleRecallIDTextChange(event) {
        var valueString = event.target.value;
        if (valueString.length != 0) {
            this.setState({ recallID: valueString });
        } else {
            this.setState({ recallID: "" });
        }
    }

    handleGroup(evtKey) {
        var key = parseInt(evtKey, 10);
        this.setState({
            groupid: key
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

    getSceneID() {

    }

    render() {
        return (
            <div>

                <div>
                    <h3><strong>Scene Setting</strong></h3>
                    <Form inline>
                        <SplitButton bsStyle="primary" title="Exist Groups" id="DropDown-LightId-Selector4" onSelect={this.handleGroup}>
                            <MenuItem>Select Group ID</MenuItem>
                            <MenuItem divider />
                            {this.getGroupMenuItem()}
                        </SplitButton>


                        <FormGroup controlId="formInlinePassword" className="fromGroup">
                            <ControlLabel>Group ID:</ControlLabel>
                            {' '}
                            <FormControl type="text" placeholder="Only from 1-64" value={this.state.groupid} onChange={this.handleGroupIdTextChange} />
                        </FormGroup>
                        {' '}

                        <FormGroup controlId="formInlinePassword" className="fromGroup">
                            <ControlLabel>Scene ID:</ControlLabel>
                            {' '}
                            <FormControl type="text" placeholder="Only from 1-64" value={this.state.sceneid} onChange={this.handleSceneIdTextChange} />
                        </FormGroup>
                        {' '}
                        <LoadingButton styleName="success" loadingName="Changing" normalName="Save Scene" clickCommand={{ command: "scene_save", group: this.state.groupid, scene: this.state.sceneid }} />
                        {/*<LoadingButton styleName="success" loadingName="Changing" normalName="Recall Scene" clickCommand={{ command: "scene", groupid: this.state.textValue }} />*/}
                        {/*<Button bsStyle="info" className="newButton" onClick={() => this.setState({ open: !this.state.open })}>Tipps</Button>*/}
                    </Form>
                </div>
                <h3><strong>Scene Recall</strong></h3>
                <div>
                    <Form inline>
                        <FormGroup controlId="formInlinePassword" className="fromGroup">
                            <ControlLabel>Recall Scene ID:</ControlLabel>
                            {' '}
                            <FormControl type="text" placeholder="Only from 1-64" value={this.state.recallID} onChange={this.handleRecallIDTextChange} />
                        </FormGroup>
                        {' '}
                        <LoadingButton styleName="success" loadingName="Changing" normalName="Recall Scene" clickCommand={{ command: "scene", recallID: this.state.recallID }} />
                    </Form>
                </div>
                <h3><strong>Scene Delete</strong></h3>
                <div>
                    <Form inline>
                        <FormGroup controlId="formInlinePassword" className="fromGroup">
                            <ControlLabel>Delete Scene ID:</ControlLabel>
                            {' '}
                            <FormControl type="text" placeholder="Only from 1-64" value={this.state.deleteID} onChange={this.handleDeleteIDTextChange} />
                        </FormGroup>
                        {' '}
                        <LoadingButton styleName="success" loadingName="Changing" normalName="Recall Scene" clickCommand={{ command: "delete_scene", deleteID: this.state.deleteID }} />
                    </Form>
                </div>
            </div >
        );
    }


}

export default SceneComp;