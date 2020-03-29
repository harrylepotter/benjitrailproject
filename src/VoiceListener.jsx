import React from "react";

class VoiceListener extends React.Component {
  constructor(props) {
    super(props);
    this.state = {sentences: [], sentenceInProgress: ''};
    this.sentences = [];
    this.inProgressStyle = {
      color: 'red',
    };
    this.checkForHotWord = this.checkForHotWord.bind(this);
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
    let recognition = SpeechRecognition ? new SpeechRecognition() : false;
    recognition.lang = "en-GB";
    recognition.interimResults = true;

    recognition.addEventListener("speechstart", event => {
      this.speaking = true;
    });

    recognition.addEventListener("speechend", event => {
      this.speaking = false;
    });

    recognition.addEventListener("result", event => {
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

    recognition.addEventListener("end", () => {
      recognition.start(); 
      me.setState(state => ({
        sentenceInProgress: ''
      }));
    });

    recognition.start();

  }

  render() {
    return(
      <p>
        {this.state.sentences.map((value, index) => {
          return <span>{value}. </span>
        })}
        <span style={this.inProgressStyle}>{this.state.sentenceInProgress}</span>
      </p>      

    );
  }
}
export default VoiceListener;
