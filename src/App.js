import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import Lobby from "./components/Lobby/Lobby";
import Quiz from "./components/Quiz/Quiz";
import Result from "./components/Result/Result";
import JoinRoom from "./components/Lobby/JoinRoom/JoinRoom";
import CreateRoom from "./components/Lobby/CreateRoom/CreateRoom";

const App = props => {
	return (
		<Layout>
			<Switch>
				<Route path="/quiz" component={Quiz} />
				<Route path="/result" component={Result} />
				<Route path="/create-room" component={CreateRoom} />
				<Route path="/join-room" component={JoinRoom} />
				<Route path="/" exact component={Lobby} />
				<Redirect to="/" />
			</Switch>
		</Layout>
	);
};

export default App;
