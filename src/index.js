import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4001";
export const socket = socketIOClient(ENDPOINT);


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

