import React  from 'react';
import { AudioRecorder } from 'react-audio-voice-recorder';
import './Record.css'; // Import your CSS file

const Record = () => {
  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
    document.body.appendChild(audio);
  };

  return (
    <div>
   <AudioRecorder 
      onRecordingComplete={addAudioElement}
      audioTrackConstraints={{
        noiseSuppression: true,
        echoCancellation: true,
      }} 
      downloadOnSavePress={true}
      downloadFileExtension="webm"
      className="audio-recorder-button" // Use custom CSS class if needed
    />
      {/* <button onClick={recorderControls.stopRecording}>Stop recording</button> */}
    </div>
  );
};

export default Record;
