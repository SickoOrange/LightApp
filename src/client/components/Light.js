import React from 'react';
import * as LightsActions from "../actions/LightsActions";
import GruppeId from "../components/GruppeId"

class Light extends React.Component {
    constructor(props) {
        super(props);
        this.handleOnChange = this.handleOnChange.bind(this);
        var light = this.props.light;
        this.state = {
            BDADDR: light.BDADDR,
            dimm: light.dimm,
            ID: light.ID,
            password: light.password,
            repeater: light.repeater,
            version: light.version
        };
    }

    handleOnChange(event) {
        this.setState({ dimm: event.target.value });
    }

    componentWillReceiveProps(nextProps) {
        var light = nextProps.light;
        this.setState({
            BDADDR: light.BDADDR,
            dimm: light.dimm,
            ID: light.ID,
            password: light.password,
            repeater: light.repeater,
            version: light.version
        });
    }

    generateRow() {
        var _this = this;
        var BDADDR = this.state.BDADDR;
        var dimm = this.state.dimm;
        var switchClass = dimm > 0 ? 'buttonOn' : 'buttonOff';
        var switchValue = dimm > 0 ? 0 : 100;
        var state = dimm > 0 ? "ON" : "OFF";
        var checkedValue = dimm > 0 ? true : false;
        return [
            <div className="lightRow">
        
                <div className="blink">
                    <div className="blinkPicture" onClick={() => LightsActions.setLight({ command: "blink", BDADDR: _this.state.BDADDR }) }></div>
                    <span className="clickText">Click to blink</span>
                </div>
                <div className="idAndSwitchWrapper">
                    <div className="id">{BDADDR}</div>
                    <div className="onOffSwitch">
                        <label className={switchClass + " switch"}>
                            <input type="checkbox" checked={checkedValue}/>
                            <div className="slider" onClick={() => LightsActions.setLight({ command: "dimm", dimm_value: switchValue, group_id: _this.state.BDADDR }) } >{state}</div>
                        </label>
                    </div>
                </div>
                <div className="intensityPic">
                    <img src="img/intensity_icon.png"/>
                </div>
                <div className="intensity">
                    <input type="text" value={_this.state.dimm} onChange={_this.handleOnChange }/>
                    <span>intensity [%]</span>
                </div>
                <div className="buttonWrapper">
                    <button className="saveButton" onClick={() => LightsActions.setLight({ command: "dimm", group_id: _this.state.BDADDR, dimm_value: _this.state.dimm }) }>SAVE</button>
                </div>
            </div>
            
        ];
    }

    render() {
        
        var row = this.generateRow();

        return (<div className="rowWrapper">{row}</div>);
    }
}

export default Light;