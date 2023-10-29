// TranscriptionComponent.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { transcribeAudio } from "../slices/transcriptionSlice";

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
            </div>
        )}
    </div>
);
}

export default TranscriptionComponent;
