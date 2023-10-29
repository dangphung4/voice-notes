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
            });
        }
    });

export default transcriptionSlice.reducer;
