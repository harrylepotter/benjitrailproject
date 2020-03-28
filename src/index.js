import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

navigator.mediaDevices.getUserMedia({ audio: true }).then(function(stream) {
  window.stream = stream;
  const rootElement = document.getElementById("root");
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    rootElement
  );
});
