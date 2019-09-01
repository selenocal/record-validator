import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import configureStore from "./store/index";
import App from "./containers/App/App";
import "./styles.css";

const store = configureStore({});
const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

const rootElement = document.getElementById("root");
ReactDOM.render(app, rootElement);
