import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";

import { socket } from "./index";

import "./App.css";

import Lobby from "./components/Lobby/Lobby";
import Quiz from "./components/Quiz/Quiz";
import Result from "./components/Result/Result";

import * as actions from "./store/actions/actions";

const App = props => {
	const { startQuiz, updateScore, setOpponentLeft, history } = props;

	useEffect(() => {
		socket.on("start_game_ack", room => {
			startQuiz(room);
			history.push(`/quiz`);
		});

		socket.on("opponent_left", finalScore => {
			updateScore(finalScore);
			setOpponentLeft();
			history.push("/result");
		});

		return () => {
			socket.off("start_game_ack")
			socket.off("opponent_left")
		}
		//eslint-disable-next-line
	}, []);

	return (
		<Switch>
			<Route path="/quiz" component={Quiz} />
			<Route path="/result" component={Result} />
			<Route path="/" exact component={Lobby} />
			<Redirect to="/" />
		</Switch>
	);
};

const mapDispatchToProps = dispatch => {
	return {
		updateScore: score => dispatch(actions.updateScore(score)),
		setOpponentLeft: () => dispatch(actions.setOpponentLeft()),
		startQuiz: roomID => dispatch(actions.startQuiz(roomID)),
	};
};

export default connect(null, mapDispatchToProps)(App);
