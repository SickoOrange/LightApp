import React from "react";
import {Link} from "react-router";
import ReactDOM from 'react-dom';


export default class Layout extends React.Component {
    render() {
         console.log("load Layout");
        return (
            <div>
                <div>{this.props.children}</div>
            </div>
        );
    }
}