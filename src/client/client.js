import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, IndexRoute, hashHistory} from "react-router";

import Layout from "./pages/Layout";
import Dashboard from "./nextap_modules/lights-ui-framework/index";

import MenuBoard from "./components/MenuBoard";

import "./sass/main.scss";
import "bootstrap-sass";

import './components/index.css';
import App from './components/App';

const app = document.getElementById('app');

ReactDOM.render(
	<Router history={hashHistory}>
		<Route path="/" component={App}></Route>
		<Route path="/light" component={Dashboard}></Route>
	</Router>,
	app);