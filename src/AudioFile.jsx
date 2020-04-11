import React from "react";
import Pizzicato from "pizzicato";
import { Button } from "@material-ui/core";

class AudioFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isRecording: false, audioUrl: null };
    this.toggleRecord = this.toggleRecord.bind(this);
    this.initAndStartRecorder = this.initAndStartRecorder.bind(this);
    this.play = this.play.bind(this);
    this.player = null;
    this.initialized = false;

    this.tremolo = new Pizzicato.Effects.Tremolo({
      speed: 6,
      depth: 2,
      mix: 1
    });

    this.ringModulator = new Pizzicato.Effects.RingModulator({
      speed: Math.floor(Math.random() * 10),
      distortion: 1,
      mix: 1
    });

    
  }

  componentDidMount() {
    //this.initRecorder();
    let me = this;

    let storedAudio = window.localStorage.getItem(me.props.tag);
    if(storedAudio != null){
      me.setState(state => ({
        audioUrl: storedAudio
      }));
    }
  }

  componentDidUpdate(){
    //console.log('audiofile: component did update', this.state.audioUrl);
  }

  hasAudio(){
    return !(this.state.audioUrl == null);
  }

  async initAndStartRecorder() {
    let me = this;

    let storedAudio = window.localStorage.getItem(me.props.tag);
    if(storedAudio != null){
      me.setState(state => ({
        audioUrl: storedAudio
      }));
    }

    if(typeof window.stream == 'undefined'){
      window.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      alert('got stream');
    }

    let audioChunks = [];
    this.mediaRecorder = new MediaRecorder(window.stream);
    console.log("mediarecorder=", this.mediaRecorder);
    this.mediaRecorder.addEventListener("dataavailable", event => {
      audioChunks.push(event.data);
    });

    this.mediaRecorder.addEventListener("stop", () => {
      console.log("stopped recording audio");
      const audioBlob = new Blob(audioChunks);
      me.setState(state => ({
        audioUrl: URL.createObjectURL(audioBlob)
      }));

      var reader = new FileReader();
      reader.readAsDataURL(audioBlob); 
      reader.onloadend = function() {
          var base64data = reader.result;                
          window.localStorage.setItem(me.props.tag, base64data);
      }

    });

    this.mediaRecorder.addEventListener("start", () => {
      console.log("started recording audio"); 
      audioChunks = [];
    });

    this.initialized = true;
    this.mediaRecorder.start();
  }

  toggleRecord() {
    console.log("toggleRecord:", this);
    if (!this.state.isRecording) {
      if(!this.initialized){
        this.initAndStartRecorder();
      }else{
        this.mediaRecorder.start();
      }
 
    } else {
      this.mediaRecorder.stop();
    }

    this.setState(state => ({
      isRecording: !state.isRecording
    }));
  }

  play() {
    let me = this;
    if (me.player != null) me.player.disconnect();

    me.player = new Pizzicato.Sound(
      { source: "file", options: { path: me.state.audioUrl, loop: false } },
      function() {
        if (me.props.withEffects) {
          me.player.addEffect(me.tremolo);
          me.player.addEffect(me.ringModulator);
          setInterval(function() {
            me.tremolo.speed = Math.floor(Math.random() * 8);
            me.ringModulator.speed = Math.floor(Math.random() * 10);
          }, 130);
        }
        me.player.play();
      }
    );
  }

  render() {
    return (
      <div>
        <Button color="primary" onClick={this.toggleRecord}>
          {this.state.isRecording ? "Stop" : "Record"}
        </Button>
        <Button
          disabled={this.state.audioUrl == null || this.state.isRecording}
          onClick={this.play}
        >
          Play
        </Button>
      </div>
    );
  }
}

export default AudioFile;
