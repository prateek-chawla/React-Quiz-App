import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import Lobby from "./components/Lobby/Lobby";
import Quiz from "./components/Quiz/Quiz";

const App = () => {
	return (
		<Layout>
			<Switch>
				<Route path="/quiz" component={Quiz} />
				<Route path="/" exact component={Lobby} />
				<Redirect to="/" />
			</Switch>
		</Layout>
	);
};

export default App;
