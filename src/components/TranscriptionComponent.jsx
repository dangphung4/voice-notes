// TranscriptionComponent.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  transcribeAudio,
  summarizeTranscription,
  elaborateTranscription,
} from "../slices/transcriptionSlice";

export function TranscriptionComponent({ uid }) {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const transcription = useSelector(
    (state) => state.transcription.transcription
  );

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const onTranscribeClick = () => {
    if (file) {
      dispatch(transcribeAudio({ file, uid }));
    }
  };

  const onSummarizeClick = () => {
    dispatch(summarizeTranscription({ transcription, uid }));
  };

  const onElaborateClick = () => {
    dispatch(elaborateTranscription({ transcription, uid }));
  };

  return (
    <div className="mt-4">
        <input type="file" onChange={onFileChange} accept="video/mp4" />
        <button onClick={onTranscribeClick} className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-500 transition-colors duration-200 w-full mt-4">
            Transcribe
        </button>
        {transcription && (
            <div className="mt-4">
                <h2>Transcription:</h2>
                <p>{transcription}</p>
                <button onClick={onSummarizeClick} className="bg-green-600 text-white p-2 rounded-md hover:bg-green-500 transition-colors duration-200 w-full mt-2">
                    Summarize
                </button>
                <button onClick={onElaborateClick} className="bg-yellow-600 text-white p-2 rounded-md hover:bg-yellow-500 transition-colors duration-200 w-full mt-2">
                    Elaborate
                </button>
            </div>
        )}
    </div>
);
}

export default TranscriptionComponent;
