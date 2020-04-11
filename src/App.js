import React from "react";
import "./styles.css";
import AudioContainer from "./AudioContainer";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

export default function App() {
  
  var imgStyle = {
    width: '80%'
  };

  let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  let hasSpeechRecognition = SpeechRecognition || false;




  return (
    <div className="App">
        <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <img style={imgStyle} src="logo2.svg"></img>
          <div>
            Tired of endless zoom calls? Want to properly social distance?
            Let us do the talking for you. 
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
  { hasSpeechRecognition ? <AudioContainer></AudioContainer> : <div>fuck</div>}
        </Grid>
      </Grid>
      
    </div>
  );
}
