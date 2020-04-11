import React from "react";
import Button from '@material-ui/core/Button';
import { textChangeRangeIsUnchanged } from "typescript";

class VoiceListener extends React.Component {
  constructor(props) {
    super(props);
    this.state = {sentences: [], sentenceInProgress: '', listening:false};
    this.sentences = [];
    this.inProgressStyle = {
      color: 'red',
    };
    this.checkForHotWord = this.checkForHotWord.bind(this);
    this.toggleListening = this.toggleListening.bind(this);

    this.ttsStyle = {
      fontFamily: 'DIN',
      position: 'absolute',
      top: '114px',
      opacity: '0.1',
      fontSize: '36px',
      width: '50%',
      textAlign: 'left',
      left: '0',
      zIndex: '0',
      height: '78%',
      overflowY: 'hidden'
    }
    
  }

  checkForHotWord(){
    let lastSentence = this.state.sentences[this.state.sentences.length -1];
    if(lastSentence.toLowerCase().indexOf(this.props.hotWord.toLowerCase()) > -1){
      if(typeof(this.props.onHotWord) == 'function');
        this.props.onHotWord();
    }
      
  }

  componentDidMount(){
    let me = this;
    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    me.recognition = SpeechRecognition ? new SpeechRecognition() : false;
    me.recognition.lang = "en-GB";
    me.recognition.interimResults = true;

    me.recognition.addEventListener("speechstart", event => {
      this.speaking = true;
    });

    me.recognition.addEventListener("speechend", event => {
      this.speaking = false;
    });

    me.recognition.addEventListener("result", event => {
      const text = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join("");
        if(event.results[0].isFinal){
          me.sentences.push(text);
          me.setState(state => ({
            sentences: me.sentences
          }));
          me.props.onSentences(me.sentences);
          me.checkForHotWord();
        }else{
          me.setState(state => ({
            sentenceInProgress: text
          }));
        }
    });

    me.recognition.addEventListener("end", () => {
      if(!me.state.listening)
        return;
      me.recognition.start(); 
      me.setState(state => ({
        sentenceInProgress: ''
      }));
    });


  }

  toggleListening(){
    let me = this;
    if(me.state.listening)
      me.recognition.stop();
    else
      me.recognition.start();

    me.setState(state => ({
        listening: !me.state.listening
    }));
  }

  render() {
    return(
      <div>
        <Button onClick={this.toggleListening}>{this.state.listening == false ? "Start Listening" : "Stop Listening"}</Button>
        <div className="texta" style={this.ttsStyle}>
          {this.state.sentences.map((value, index) => {
            return <span>{value}. </span>
          })}
          <span style={this.inProgressStyle}>{this.state.sentenceInProgress}</span>    
        </div>
      </div>


    );
  }
}
export default VoiceListener;
