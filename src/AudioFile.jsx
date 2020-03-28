import React from "react";
import Pizzicato from "pizzicato";
import { Button } from "@material-ui/core";

class AudioFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isRecording: false, audioUrl: null };
    this.toggleRecord = this.toggleRecord.bind(this);
    this.initRecorder = this.initRecorder.bind(this);
    this.play = this.play.bind(this);
    this.player = null;

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
    this.initRecorder();
  }

  async initRecorder() {
    let me = this;
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
      me.dispatchEvent("audioChange", "cunt!");
      //this.props.onAudioChange(this.state.audioUrl);
    });

    this.mediaRecorder.addEventListener("start", () => {
      console.log("started recording audio");
      audioChunks = [];
    });
  }

  toggleRecord() {
    console.log("toggleRecord:", this);
    if (!this.state.isRecording) {
      this.mediaRecorder.start();
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
