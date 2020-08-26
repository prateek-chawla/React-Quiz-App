import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension/developmentOnly";

import "./index.css";
import App from "./App";

import socketIOClient from "socket.io-client";

import reducer from "./store/reducers/reducer";

const ENDPOINT = "http://127.0.0.1:4001";
export const socket = socketIOClient(ENDPOINT);

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
