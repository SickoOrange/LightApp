import React from "react";
import './MyElement.css';
import { Button, Collapse, Well } from 'react-bootstrap';

import * as LightsActions from "../actions/LightsActions";
import LightsStore from "../stores/LightsStore";


class LoadingButton extends React.Component {

    constructor(props) {
        console.log('loading button constructor')
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.passwordEvent = this.passwordEvent.bind(this);
        this.identificationEvent = this.identificationEvent.bind(this);
        this.groupHandleResEvent = this.groupHandleResEvent.bind(this);
        this.sceneHandleResEvent = this.sceneHandleResEvent.bind(this);
        this.sequenceHandleResEvent = this.sequenceHandleResEvent.bind(this);
        this.state = {
            isLoading: false
        }
    }

    componentWillMount() {
        LightsStore.on("passwordEvent", this.passwordEvent);
        LightsStore.on("identificationResEvent", this.identificationEvent);
        LightsStore.on("groupHandleResEvent", this.groupHandleResEvent);
        LightsStore.on("sceneHandleResEvent", this.sceneHandleResEvent);
        LightsStore.on("sequenceHandleResEvent", this.sequenceHandleResEvent);



    }
    componentWillUnmount() {
        LightsStore.removeListener("passwordEvent", this.passwordEvent);
        LightsStore.removeListener("identificationResEvent", this.identificationEvent);
        LightsStore.removeListener("groupHandleResEvent", this.groupHandleResEvent);
        LightsStore.removeListener("sceneHandleResEvent", this.sceneHandleResEvent);
        LightsStore.removeListener("sequenceHandleResEvent", this.sequenceHandleResEvent);

    }

    sceneHandleResEvent() {
        var sceneHandleRes = LightsStore.getSceneHandleRes();
        if (sceneHandleRes.command === this.props.clickCommand.command) {
            this.setState({
                isLoading: false
            });
        }

    }

    sequenceHandleResEvent() {
        var sequenceHandleRes = LightsStore.getSequenceHandleRes();
        if (sequenceHandleRes.command === this.props.clickCommand.command) {
            this.setState({
                isLoading: false
            });
        }

    }


    groupHandleResEvent() {
        var _this = this;
        var groupHandleRes = LightsStore.getGroupHandleRes();
        if (groupHandleRes.command) {
            if (groupHandleRes.command === this.props.clickCommand.command) {


                //update the Lights group, wenn we change the group number or delete a group
                setTimeout(function () {
                    console.log('2s new groups poll request');
                    LightsActions.pollGroups();
                    _this.setState({
                        isLoading: false
                    });
                }, 1000);
            }


        } else {
            //group exist response, need to reset GroupAssignment Button
            if (this.props.clickCommand.command === "group_assign") {
                this.setState({
                    isLoading: false
                });
            }
        }

    }

    passwordEvent() {
        var passwordRes = LightsStore.getPasswordRes();
        if (passwordRes.command === this.props.clickCommand.command) {
            this.setState({
                isLoading: false
            });
        }
    }

    identificationEvent() {
        var identificationRes = LightsStore.getIdentificationRes();
        if (identificationRes.command === this.props.clickCommand.command) {
            this.setState({
                isLoading: false
            });
        }

    }

    render() {

        let isLoading = this.state.isLoading;
        let styleName = this.props.styleName;
        let loadingName = this.props.loadingName;
        let normalName = this.props.normalName;

        return (
            <Button bsStyle={styleName}
                className="newButton"
                disabled={isLoading}
                onClick={!isLoading ? this.handleClick : null}
            >{
                    isLoading ? loadingName : normalName
                }
            </Button>
        );
    }


    decStr2Hex(str) {
        var paserRes = parseInt(str);
        if (paserRes < 16 && paserRes > 0) {
            return "0" + paserRes.toString(16);
        } else {
            return paserRes.toString(16);
        }
    }

    cauculatePosition(id) {
        //need how many byte to store the id 
        var result = [];
        var needBytes = parseInt(id / 8) + 1
        var packetLength = parseInt(4 + needBytes).toString(16);

        if (parseInt(packetLength, 16) < 16) {
            packetLength = "0" + packetLength;
        }

        var remainder = id - (needBytes - 1) * 8

        var binarArray = [0, 0, 0, 0, 0, 0, 0, 0]

        binarArray[remainder] = 1;

        var binarString = ''
        binarArray.map(function (item) {
            binarString += item;
        })
        var hexString = parseInt(binarString, 2).toString(16);

        if (remainder > 3) {
            hexString = "0" + hexString;
        }

        for (var i = 0; i < needBytes - 1; i++) {
            hexString = "00" + hexString;
        }
        result.push(hexString);
        result.push(packetLength);
        return result;
    }


    handleClick() {
        console.log('loading button ' + this.props.clickCommand)
        this.setState({
            isLoading: true
        });

        switch (this.props.clickCommand.command) {
            case "password_remote":
                var data = {
                    command: this.props.clickCommand.command,
                    pw: this.props.clickCommand.pw
                }
                LightsActions.passwordSetting(data);
                break;
            case "password_local":
                var data = {
                    command: this.props.clickCommand.command,
                }
                LightsActions.passwordSetting(data);
                break;

            case "identification_assign":
                var command = this.props.clickCommand;
                var splitArray = command.bdaddr.split(":");

                var originId = command.id;
                var result = originId.match(/^\d{1,3}$/);
                if (result == null) {
                    alert('The id entered is invalid');
                    this.setState({
                        isLoading: false
                    });
                    return;
                }
                if (parseInt(originId) > 191 && parseInt(originId) < 0) {
                    alert('The id entered is invalid');
                    this.setState({
                        isLoading: false
                    });
                    return;
                }

                var id = this.decStr2Hex(originId);

                var data = {
                    command: "identification_assign",
                    bdaddr: splitArray[1],
                    id: id
                }
                console.log('identification_assign' + JSON.stringify(data));
                LightsActions.handleIdentification(data);
                break;

            case "identification_clear":
                setTimeout(
                    () => {
                        this.setState({
                            isLoading: false
                        });
                    }, 2);
                var command = this.props.clickCommand;
                if (command.bdaddr.indexOf("Light") >= 0) {
                    alert('please select a light!');
                    this.setState({
                        isLoading: false
                    });
                    return;
                }
                var splitArray = command.bdaddr.split(":");

                var data = {
                    command: "identification_clear",
                    bdaddr: splitArray[1]
                }
                console.log('identification_clear' + JSON.stringify(data));
                LightsActions.handleIdentification(data);
                break;

            case "group_assign":
                var command = this.props.clickCommand;
                var groupid = this.decStr2Hex(parseInt(command.groupid, 10).toString());
                var id = command.id.split(":");

                id = parseInt(id[1], 10);
                var mode = '';
                if (id >= 0 && id <= 95) {
                    mode = '00';
                }
                if (id > 95 && id <= 191) {
                    mode = "01";
                    id = id - 96;
                }
                //id:1, 2,10
                var result = this.cauculatePosition(id);


                //id = this.decStr2Hex(id.toString());
                //id packagelength need to be modify
                var data = {
                    command: "group_assign",
                    packageLength: result[1],
                    groupid: groupid,
                    mode: mode,
                    id: result[0]
                }
                console.log('loading button group_assign: ' + JSON.stringify(data));
                LightsActions.groupHandle(data);
                break;
            case "group_delete":
                var command = this.props.clickCommand;
                var groupid = this.decStr2Hex(parseInt(command.groupid, 10).toString());
                var data = {
                    command: "group_delete",
                    groupid: groupid
                }
                console.log('loading button group_assign: ' + JSON.stringify(data));
                LightsActions.groupHandle(data);
                break;

            case "scene_save":
                var command = this.props.clickCommand;
                var scene = this.decStr2Hex(parseInt(command.scene, 10).toString());
                var id = parseInt(command.group, 10);
                //group position in Scene Save mode, first byte is 1 not 0!!!
                var result = this.cauculatePosition(id - 1);
                var data = {
                    command: command.command,
                    //need to modify the api from Connect light
                    packageLength: result[1],
                    group: result[0],
                    scene: scene
                }
                console.log('loading button scene_save: ' + JSON.stringify(data));
                LightsActions.sceneHandle(data);
                break;

            case "scene":
                var command = this.props.clickCommand;
                var recallID = command.recallID;
                recallID = this.decStr2Hex(parseInt(recallID, 10).toString());
                var data = {
                    command: command.command,
                    sceneID: recallID
                }
                console.log('loading button scene: ' + JSON.stringify(data));
                LightsActions.sceneHandle(data);
                break;

            case "delete_scene":
                var command = this.props.clickCommand;
                var deleteID = command.deleteID;
                deleteID = this.decStr2Hex(parseInt(deleteID, 10).toString());
                var data = {
                    command: command.command,
                    sceneID: deleteID
                }
                console.log('loading button scene: ' + JSON.stringify(data));
                LightsActions.sceneHandle(data);
                break;

            case "get_scene":
                var command = this.props.clickCommand;
                var data = {
                    command: command.command,
                }
                LightsActions.sceneHandle(data);
                break;

            case "sequenceControl_save":
                var command = this.props.clickCommand;
                var sequenceID = '0' + command.sequenceID;

                var sceneTime = command.sceneTime;
                sceneTime = parseInt(sceneTime, 10).toString(16);
                if (sceneTime.length < 4) {
                    var zeroCounter = 4 - sceneTime.length;
                    for (var i = 0; i < zeroCounter; i++) {
                        sceneTime = '0' + sceneTime
                    }
                }

                var fadeTime = this.decStr2Hex(parseInt(command.fadeTime, 10));

                var scenesArry = command.Scenes.split(",");
                var sceneStr = '';
                // scenesArry.map(function (item) {
                //     sceneStr += this.decStr2Hex(parseInt(item, 10).toString);
                // })
                for (var i = 0; i < scenesArry.length; i++) {
                    sceneStr += this.decStr2Hex(parseInt(scenesArry[i], 10));
                }

                var packageLength = this.decStr2Hex(parseInt(8 + scenesArry.length, 10));
                var NrScenes = this.decStr2Hex(parseInt(scenesArry.length, 10));

                var data = {
                    command: command.command,
                    packageLength: packageLength,
                    sequenceID: sequenceID,
                    sceneTime: sceneTime,
                    fadeTime: fadeTime,
                    nrScenes: NrScenes,
                    scenes: sceneStr
                }
                console.log('loading button sequenceControl_save: ' + JSON.stringify(data));
                LightsActions.sequenceHandle(data);
                break;
            case "sequenceControl_start":
                var command = this.props.clickCommand;
                var sequenceID = '0' + command.sequenceID;
                var data = {
                    command: command.command,
                    sequenceID: sequenceID
                }
                console.log('loading button sequenceControl_start: ' + JSON.stringify(data));
                LightsActions.sequenceHandle(data);
                break;
            case "sequenceControl_stop":
                var command = this.props.clickCommand;
                var sequenceID = '0' + command.sequenceID;
                var data = {
                    command: command.command,
                    sequenceID: sequenceID
                }
                console.log('loading button sequenceControl_stop: ' + JSON.stringify(data));
                LightsActions.sequenceHandle(data);
                break;
        }
    }

}

export default LoadingButton;