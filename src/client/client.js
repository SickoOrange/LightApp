import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, IndexRoute, hashHistory} from "react-router";

import Layout from "./pages/Layout";
import Dashboard from "./nextap_modules/lights-ui-framework/index";

import "./sass/main.scss";
import "bootstrap-sass";

const app = document.getElementById('app');

ReactDOM.render(
	<Router history={hashHistory}>
		<Route path="/" component={Layout}>
			<IndexRoute path="/" component={Dashboard}></IndexRoute>
		</Route>
	</Router>,
	app);