import React from "react";
import Lights from "../components/Lights";

export default class Dashboard extends React.Component {
    render() {
        console.log("load Dashboard");
        return ( 
           <Lights/>
           
        );
    }
}