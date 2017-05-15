import React from 'react';
import * as LightsActions from "../actions/LightsActions";
import LightsStore from "../stores/LightsStore";


class Light extends React.Component {

    constructor(props) {
        super(props);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.blinkEvent = this.blinkEvent.bind(this);
        this.dimmEvent = this.dimmEvent.bind(this);
        var light = this.props.light;
        this.state = {
            ID: light.ID,
            dimm: light.dimm,
            groupid: light.groupid,
            BDADDR: light.BDADDR
        };
    }

    handleOnChange(event) {
        var valueString = event.target.value;
        if (valueString.length != 0) {
            this.setState({ dimm: parseInt(event.target.value) });
        } else {
            this.setState({ dimm: "" });
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log('light componentWillReceiveProps');
        var light = nextProps.light;
        this.setState({
            ID: light.ID,
            dimm: light.dimm,
            groupid: light.groupid,
            BDADDR: light.BDADDR
        });
    }

    componentWillMount() {
        LightsStore.on("blinkEvent", this.blinkEvent);
        LightsStore.on("dimmEvent", this.dimmEvent);

    }
    componentWillUnmount() {
        LightsStore.removeListener("blinkEvent", this.blinkEvent);
        LightsStore.removeListener("dimmEvent", this.dimmEvent);
    }

    blinkEvent() {
        var blinkRes = LightsStore.getBlinkRes();
        console.log("blinkEvent respnse: " + blinkRes.bdaddr);
        console.log("blinkEvent " + this.state.BDADDR);
        if (blinkRes.bdaddr === this.state.BDADDR) {
            this.setState({
                dimm: 100
            });
        }
    }

    dimmEvent() {
        var dimmRes = LightsStore.getDimmRes();
        var id = this.state.groupid.substring(1, this.state.groupid.length);
        if (dimmRes.groupid === id) {
            this.setState({
                dimm: dimmRes.dimm
            });
        }
    }

    generateRow() {
        var _this = this;
        var BDADDR = this.state.ID;
        var dimm = this.state.dimm;
        var switchClass = dimm > 0 ? 'buttonOn' : 'buttonOff';
        var switchValue = dimm > 0 ? 0 : 100;
        var state = dimm > 0 ? "ON" : "OFF";
        var checkedValue = dimm > 0 ? true : false;
        //LightsActions.setLight(this.props.deviceID,{ command: "blink", BDADDR: _this.state.BDADDR })
        return [
            <div className="lightRow">
                {/*<div className="selectWrapper">
                    <DropDown className="selectDropDown" ></DropDown>
                    <button className="DropDownButton" onClick={() => { LightsActions.logMe() }}>New</button>
                    <button className="DropDownButton" onClick={() => { LightsActions.logMe() }}>Delete</button>
                </div>
                <div className="GetIdWrapper">
                    <button className="GetIdButton" onClick={() => { LightsActions.logMe() }}>Get</button>
                </div>*/}

                <div className="blink">
                    <div className="blinkPicture" onClick={() => LightsActions.setBlink({ command: "identification_blink", bdaddr: _this.state.BDADDR })}></div>
                    <span className="clickText">Click to blink</span>
                </div>
                <div className="idAndSwitchWrapper">
                    <div className="id">{BDADDR}</div>
                    <div className="onOffSwitch">
                        <label className={switchClass + " switch"}>
                            <input type="checkbox" checked={checkedValue} />
                            <div className="slider" onClick={() => LightsActions.setDimmLight({ command: "dimm", groupid: _this.state.groupid, dimm: switchValue })} >{state}</div>
                        </label>
                    </div>
                </div>
                <div className="intensityPic">
                    <img src="/img/intensity_icon.png" />
                </div>
                <div className="intensity">
                    <input type="text" value={_this.state.dimm} onChange={_this.handleOnChange} />
                    <span>intensity [%]</span>
                </div>
                <div className="buttonWrapper">
                    <button className="saveButton" onClick={() => LightsActions.setDimmLight({ command: "dimm", groupid: _this.state.groupid, dimm: _this.state.dimm })}>SAVE</button>
                </div>
            </div>

        ];
    }

    render() {
        if (!this.state)
            return null;
        var row = this.generateRow();
        console.log('light render');
        return (<div className="rowWrapper">{row}</div>

        );
    }
}

export default Light;