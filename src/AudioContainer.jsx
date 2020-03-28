import React from "react";
import AudioFile from "./AudioFile";
import VoiceListener from "./VoiceListener";

import { TextField } from "@material-ui/core";

class AudioContainer extends React.Component {
  constructor(props) {
    super(props);
    //this.handleEvent = this.handleEvent.bind(this);
    this.audio1 = React.createRef();
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <TextField
          id="name"
          label="Your name"
          variant="filled"
          defaultValue="Ben"
        />
        <TextField
          id="timeout"
          label="Timeout"
          variant="filled"
          defaultValue="15"
        />
        <AudioFile ref={this.audio1} withEffects={false} />
        <AudioFile withEffects={false} />
        <AudioFile withEffects={true} />
        <VoiceListener />
      </div>
    );
  }
}

export default AudioContainer;
