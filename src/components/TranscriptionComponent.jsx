// TranscriptionComponent.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  transcribeAudio,
  summarizeTranscription,
  elaborateTranscription,
} from "../slices/transcriptionSlice";
import { UserProfileComponent } from './UserProfileComponent';  


export function TranscriptionComponent({ uid }) {
    const user = useSelector(state => state.auth.user); // Access the user from auth state
    const email = user?.email || 'Guest'; // If the user is logged in, get the email, else default to 'Guest'

  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [transcribeClicked, setTranscribeClicked] = useState(false);

  const [editedTranscription, setEditedTranscription] = useState(""); 

  const [isLoading, setIsLoading] = useState(false); // State to track if an API request is in progress


  const handleTranscriptionEdit = (e) => {
    setEditedTranscription(e.target.value);
};

  const transcription = useSelector(
    (state) => state.transcription.transcription
  );

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
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
<div className="w-full min-h-screen bg-gray-500 p-10 flex flex-col">
        {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-md">
            Processing, please wait...
          </div>
        </div>
      )}
    <UserProfileComponent user={{ email: email }} />
    <div className="flex justify-center space-x-4 mt-3">
    <label className="flex items-center justify-center bg-indigo-600 text-white p-1 rounded-md hover:bg-indigo-700 hover:text-white transition-colors duration-350 w-1/4">
    Choose File
    <input type="file" onChange={onFileChange} accept="video/mp4" className="hidden" />
</label>

    <button onClick={onTranscribeClick} className=" bg-green-600 text-white p-1 rounded-md hover:bg-green-700 hover:text-white transition-colors duration-350 w-1/4">
        Transcribe
    </button>
</div>


    <div className="bg-white mt-4 flex flex-col flex-grow rounded-lg p-4">
        {transcription && (
            <>
                <textarea
                    value={editedTranscription || transcription}
                    onChange={handleTranscriptionEdit}
                    className="w-full border rounded resize-none flex-grow" // Apply flex-grow here
                    placeholder="Your transcription will appear here..."
                ></textarea>

<div className="mt-4 flex space-x-4">
    {transcribeClicked && (
        <>
            <button 
                onClick={onSummarizeClick} 
                className="bg-black text-white p-1 rounded-md hover:bg-gray-300 hover:text-black transition-colors duration-350 flex-grow">
                Summarize
            </button>
            <button 
                onClick={onElaborateClick} 
                className="bg-black text-white p-1 rounded-md hover:bg-gray-300 hover:text-black transition-colors duration-350 flex-grow">
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
