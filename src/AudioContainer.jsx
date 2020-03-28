import React from "react";
import AudioFile from "./AudioFile";

class AudioContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <AudioFile withEffects={false} />
        <AudioFile withEffects={true} />
      </div>
    );
  }
}

export default AudioContainer;
