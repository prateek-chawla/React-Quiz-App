import React from "react";

import { Route, Switch, Redirect } from "react-router-dom";

import "./App.css";

import Lobby from "./components/Lobby/Lobby";
import Quiz from "./components/Quiz/Quiz";
import Result from "./components/Result/Result";

function App() {
	return (
		<Switch>
			<Route path="/quiz" component={Quiz} />
			<Route path="/result" component={Result} />
			<Route path="/" exact component={Lobby} />
			<Redirect to="/" />
		</Switch>
	);
}

export default App;
