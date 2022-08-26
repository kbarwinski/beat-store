import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { store, persistor } from "./store/store";
import { Provider } from "react-redux";
import { ModalProvider } from "styled-react-modal";
import { PersistGate } from "redux-persist/integration/react";

import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic';

var viewport = document.querySelector("meta[name=viewport]");
viewport.setAttribute("content", viewport.content + ", height=" + window.innerHeight);

const alertOptions = {
  position: positions.BOTTOM_CENTER,
  timeout: 3000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}

const root = ReactDOM.createRoot(document.getElementById("root"));


root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <AlertProvider template={AlertTemplate} {...alertOptions}>
      <ModalProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ModalProvider>
    </AlertProvider>
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
