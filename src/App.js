import React from "react";
import "./styles.css";
import AudioContainer from "./AudioContainer";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

export default function App() {
  
  var imgStyle = {
    width: '80%'
  };

  var headlineStyle = {
    fontFamily: 'Source Sans Pro',
    fontSize: '2em'
  };

  var errorStyle = {
    fontFamily: 'Source Sans Pro',
    fontSize: '1.5em',
    marginTop: '15vh'
  }

  var copyleft ={
    fontSize: '12px'
  }

  let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  let hasSpeechRecognition = SpeechRecognition || false;




  return (
    <div className="App">
        <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <img style={imgStyle} src="logo2.svg"></img>
          <div style={headlineStyle}>
            Tired of endless zoom calls? Want to properly social distance?
            Let us do the talking for you. 
            <p style={copyleft}>A Ben Davey Production. April 2020. <a href="https://github.com/harrylepotter/benjitrailproject">Github</a></p>
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
  { hasSpeechRecognition ? <AudioContainer></AudioContainer> : <div style={errorStyle}>This app only works on browsers that support continuous speech-to-text (currently Google Chrome Desktop...). Sorry.</div>}
        </Grid>
      </Grid>
      
    </div>
  );
}
