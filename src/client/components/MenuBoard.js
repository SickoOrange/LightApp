import React, { Component } from 'react';
import './MenuBoard.css';
import { Button } from 'react-bootstrap';

class MenuBoard extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);

    }

    handleClick() {
        console.log("handle click")
        const w=window.open('about:blank');
        w.location.href='/#/light';
    }
    render() {
        return (
            <div>
                <Button bsStyle="primary" onClick={this.handleClick}>Light UI</Button>
            </div>

        );
    }
}

export default MenuBoard;