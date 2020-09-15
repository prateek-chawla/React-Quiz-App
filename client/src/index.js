import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension/developmentOnly";

import "./index.css";
import App from "./App";

import io from "socket.io-client";

import reducer from "./store/reducers/reducer";

const socketURL =
	process.env.NODE_ENV === "production"
		? "https://quizit-pc.herokuapp.com"
		: "http://localhost:4001";

export const socket = io.connect(socketURL, {
	transports: ["websocket","polling"],
});

const store = createStore(reducer, devToolsEnhancer());

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);
