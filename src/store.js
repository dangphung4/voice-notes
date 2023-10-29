import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import transcriptionReducer from './slices/transcriptionSlice';
import themeReducer from './slices/themeSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        transcription: transcriptionReducer,
        theme: themeReducer
    }
});

export default store;