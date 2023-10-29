import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  transcribeAudio,
  summarizeTranscription,
  elaborateTranscription,
} from "../slices/transcriptionSlice";
import { UserProfileComponent } from "./UserProfileComponent";
import "./Transcribe.css";

export function TranscriptionComponent({ uid }) {
  const user = useSelector((state) => state.auth.user); // Access the user from auth state
  const email = user?.email || "Guest"; // If the user is logged in, get the email, else default to 'Guest'

  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [transcribeClicked, setTranscribeClicked] = useState(false);
  const [editedTranscription, setEditedTranscription] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State to track if an API request is in progress
  const [fileName, setFileName] = useState("");

  const handleTranscriptionEdit = (e) => {
    setEditedTranscription(e.target.value);
  };

  const transcription = useSelector(
    (state) => state.transcription.transcription
  );

  const onFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile.name); // Set the file name
  };

  const onTranscribeClick = async () => {
    if (file) {
      setIsLoading(true);
      await dispatch(transcribeAudio({ file, uid }));
      setIsLoading(false);
      setTranscribeClicked(true);
    }
  };

  const onSummarizeClick = async () => {
    setIsLoading(true);
    await dispatch(summarizeTranscription({ transcription, uid }));
    setIsLoading(false);
  };

  const onElaborateClick = async () => {
    setIsLoading(true);
    await dispatch(elaborateTranscription({ transcription, uid }));
    setIsLoading(false);
  };

  return (
    <div className="w-full min-h-screen bg-gray-300 p-10 flex flex-col">
      {" "}
      {/* Changed background to lighter shade */}
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-md">
            Processing, please wait...
          </div>
        </div>
      )}
      <UserProfileComponent user={{ email: email }} />
      <div className="flex justify-center space-x-4 mt-6">
        {" "}
        {/* Adjusted margin-top */}
        <label className="flex items-center justify-center bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 hover:text-white transition-colors duration-350">
        {fileName ? "Change File" : "Choose File"}
        <input type="file" onChange={onFileChange} accept="video/mp4" className="hidden" />
      </label>
      {fileName && <span className="file-badge">{fileName}</span>}{/* Display the file name here */}
        <button
          onClick={onTranscribeClick}
          className=" bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 hover:text-white transition-colors duration-350"
        >
          Transcribe
        </button>
      </div>
      <div className="bg-white mt-6 p-4 flex flex-col flex-grow rounded-lg shadow-md">
        {" "}
        {/* Adjusted margin-top */}
        {transcription && (
          <>
            <textarea
              value={editedTranscription || transcription}
              onChange={handleTranscriptionEdit}
              className="w-full border rounded resize-none flex-grow p-2 mt-4" // Apply flex-grow here
              placeholder="Your transcription will appear here..."
            ></textarea>

            <div className="mt-4 flex space-x-4">
              {transcribeClicked && (
                <>
                  <button
                    onClick={onSummarizeClick}
                    className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-300 hover:text-black transition-colors duration-350 flex-grow"
                  >
                    Summarize
                  </button>
                  <button
                    onClick={onElaborateClick}
                    className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-300 hover:text-black transition-colors duration-350 flex-grow"
                  >
                    Elaborate
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default TranscriptionComponent;
