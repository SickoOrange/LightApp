import React, { Component } from 'react';
//import logo from './logo.png';
import './App.css';
import { Button } from 'react-bootstrap';

class App extends Component {


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
            <div className="App">
                <div className="App-header">
                    {/*<img src={"app.png"} className="App-logo" alt="logo" />*/}
                    <h3>Welcome to Light APP Management</h3>
                </div>
                <p className="App-intro">
                    <code>select application</code>
                </p>
                <div>
                    <Button bsStyle="success" onClick={this.handleClick}>Light UI DashBoard</Button>
                </div>

            </div>
        );
    }
}

export default App;
