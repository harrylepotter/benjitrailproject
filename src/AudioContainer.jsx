import React, { useState } from "react";
import AudioFile from "./AudioFile";
import VoiceListener from "./VoiceListener";
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField } from "@material-ui/core";
import CountdownTimer from './CountdownTimer';

class AudioContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleAudioEvent = this.handleAudioEvent.bind(this);
    this.formValueChange = this.formValueChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleBuyTime = this.handleBuyTime.bind(this);
    this.handleFuckIt = this.handleFuckIt.bind(this);
    this.handleTimeout = this.handleTimeout.bind(this);
    this.handleSentences = this.handleSentences.bind(this);

    this.state = {name : 'Ben', timeout: '8', summoned: false, last5Sentences : []};

    this.audio1 = React.createRef();
    this.audio2 = React.createRef();
    this.audio3 = React.createRef();

    this.timer = React.createRef();
    
  }

  componentDidMount() {

  }

  handleAudioEvent() {
    this.setState(state => ({summoned: true}));
    this.timer.current.startTimer();
  }

  handleBuyTime(){
    let options = [this.audio1.current, this.audio2.current];

    options[Math.round(Math.random())].play();
    this.handleClose();
  }

  handleFuckIt(){
    this.audio3.current.play();
    this.handleClose();
  }

  formValueChange(event, ass){
    let value = event.target.value;
    if(event.target.id == 'name'){
      this.setState(state => ({
        name: value
      }));
    }
    if(event.target.id == 'timeout'){
      this.setState(state => ({
        timeout: value
      }));
    }
  }

  handleClose(){
    this.setState(state => ({summoned: false}));
    this.timer.current.clearTimer();
  }

  handleTimeout(){
    this.handleBuyTime();
  }

  handleSentences(sentences){
    let summary = sentences.slice(Math.max(sentences.length - 5, 0));
    this.setState(state => ({last5Sentences: summary}));
  }

  render() {
    return (
      <div>
        <TextField
          id="name"
          label="Your name"
          variant="filled"
          defaultValue="Ben"
          onChange={this.formValueChange}
        />
        <TextField
          id="timeout"
          label="Timeout"
          variant="filled"
          defaultValue="8"
          onChange={this.formValueChange}
        />
        <p>Audio: Sorry, i was on mute. Can you repeat the question?</p>
        <AudioFile ref={this.audio1} withEffects={false} />
        <p>Hi, can you hear me?</p>
        <AudioFile ref={this.audio2} withEffects={false} />
        <p>Big long fuck it all</p>
        <AudioFile ref={this.audio3} withEffects={true} />
        <VoiceListener hotWord={this.state.name} onHotWord={this.handleAudioEvent} onSentences={this.handleSentences}/>
        
        <Dialog
          open={this.state.summoned}
          keepMounted
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">{"You were summoned!"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <ul>
              {this.state.last5Sentences.map((value, index) => {
                return <li key={index}>{value}. </li>
              })}
              </ul>
              <CountdownTimer ref={this.timer} count={this.state.timeout} onTimeout={this.handleTimeout}/>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleFuckIt} color="secondary">Fuck it all</Button>
            <Button onClick={this.handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={this.handleBuyTime} color="primary">
              Buy Some Time
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AudioContainer;
