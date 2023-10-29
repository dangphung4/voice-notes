import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import transcriptionReducer from './slices/transcriptionSlice';


const store = configureStore({
    reducer: {
        auth: authReducer,
        transcription: transcriptionReducer

    }
});

export default store;
