import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    transcription: '',
    status: 'idle',
    error: null
};

export const transcribeAudio = createAsyncThunk(
    'transcription/transcribeAudio',
    async ({ file, uid }) => {
        const formData = new FormData();
        formData.append('audio', file);
        formData.append('id', uid);
        
        const response = await fetch('http://localhost:1231/transcription/upload/', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.text();
        return data;
    }
);

export const summarizeTranscription = createAsyncThunk(
    'transcription/summarize',
    async ({ transcription, uid }) => {
        const response = await fetch('http://localhost:1231/chatgpt/summarize/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'id': uid
            },
            body: JSON.stringify({ text: transcription })
        });
        
        const data = await response.json();
        return data.summary;
    }
);

export const elaborateTranscription = createAsyncThunk(
    'transcription/elaborate',
    async ({ transcription, uid }) => {
        const response = await fetch('http://localhost:1231/chatgpt/elaborate/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'id': uid
            },
            body: JSON.stringify({ text: transcription })
        });
        
        const data = await response.json();
        console.log(data);
        return data.elaboration;
    }
);

const transcriptionSlice = createSlice({
    name: 'transcription',
    initialState,
    reducers: {
        // Add reducers as needed
    },
    // Extra reducers for async thunks can also be added here
    extraReducers: (builder) => {
        builder
            .addCase(transcribeAudio.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(transcribeAudio.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.transcription = action.payload;
                state.error = null;
            })
            .addCase(transcribeAudio.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(summarizeTranscription.fulfilled, (state, action) => {
                state.transcription = action.payload;
                state.error = null;
            })
            .addCase(elaborateTranscription.fulfilled, (state, action) => {
                state.transcription = action.payload;
                state.error = null;
            });
        }
    });

export default transcriptionSlice.reducer;
