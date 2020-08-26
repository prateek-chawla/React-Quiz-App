import React, { useEffect } from "react";
import { connect } from "react-router-dom";
import { Route, Switch, Redirect } from "react-router-dom";

import "./App.css";

import Lobby from "./components/Lobby/Lobby";
import Quiz from "./components/Quiz/Quiz";
import Result from "./components/Result/Result";

import * as actions from './store/actions/actions'

const app = props => {
	useEffect(() => {
		socket.on("start_game_ack", room => {
			props.startQuiz(room)
			props.history.push(`/quiz`);
		});

		socket.on("opponent_left", finalScore => {
			props.updateScore(finalScore)
			props.setOpponentLeft()
			props.history.push("/result");
		});
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
}


export default connect(null,mapDispatchToProps)(app)
