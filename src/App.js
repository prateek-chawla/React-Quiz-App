import React from "react";

import { Route, Switch,Redirect } from "react-router-dom";

import "./App.css";

import Lobby from "./components/Lobby/Lobby";
import Quiz from "./components/Quiz/Quiz";

function App() {
	return (
		<Switch>
			<Route path="/quiz/:roomid" component={Quiz} />
			<Route path="/" exact component={Lobby} />
			<Redirect to="/" />
		</Switch>
	);
}

export default App;
