import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const rootElement = document.getElementById("root");
if(!navigator.mediaDevices){
  ReactDOM.render(
    <React.StrictMode>
      This app only works on browsers that allow audio recording (chrome). Sorry
    </React.StrictMode>,
    rootElement
  );
}else{
  navigator.mediaDevices.getUserMedia({ audio: true }).then(function(stream) {
    window.stream = stream;
    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      rootElement
    );
  });
  
}

