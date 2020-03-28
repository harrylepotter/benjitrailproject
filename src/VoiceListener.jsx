import React from "react";

class VoiceListener extends React.Component {
  constructor(props) {
    super(props);

    let SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition = SpeechRecognition ? new SpeechRecognition() : false;
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.addEventListener("speechstart", event => {
      this.speaking = true;
      console.log("speechstart");
    });

    recognition.addEventListener("speechend", event => {
      this.speaking = false;
      console.log("speechend");
    });

    recognition.addEventListener("result", event => {
      const text = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join("");
      console.log("result:", text);
      this.runtimeTranscription = text;
    });

    recognition.addEventListener("end", () => {
      recognition.start(); //fuck
    });

    console.log("i got here");
    recognition.start();
    // recognition.addEventListener('end', () => {
    //   if (this.runtimeTranscription !== '') {
    //    } this.sentences.push(this.capitalizeFirstLetter(this.runtimeTranscription))
    //     this.$emit('update:text', `${this.text}${this.sentences.slice(-1)[0]}. `)
    //   }
    //   this.runtimeTranscription = '';
  }

  render() {
    return <div>Here the voice listener my cunt</div>;
  }
}
export default VoiceListener;
