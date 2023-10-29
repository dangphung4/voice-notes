import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import auth from '../firebase.js'; 
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { signInAnonymously } from "firebase/auth";



// Async thunk for logging in
export const loginUser = createAsyncThunk('auth/loginUser', async (credentials) => {
    const { email, password } = credentials;
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const { user } = userCredential;
    console.log(user);
    // Extracting only the serializable data
    return {
        uid: user.uid,
        email: user.email
    };
});

// Async thunk for anonymous login
export const loginAnonymously = createAsyncThunk('auth/loginAnonymously', async () => {
    const userCredential = await signInAnonymously(auth);
    const { user } = userCredential;
    return {
        uid: user.uid
    };
});


// Async thunk for user registration
export const registerUser = createAsyncThunk('auth/registerUser', async (credentials) => {
    const { email, password } = credentials;
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const { user } = userCredential;
    // Extracting only the serializable data
    return {
        uid: user.uid,
        email: user.email
    };
});

// Async thunk for password reset
export const resetPassword = createAsyncThunk('auth/resetPassword', async (email) => {
    await sendPasswordResetEmail(auth, email);
    return email;  // return email for feedback to the user
});

// Async thunk for logging out
export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
    await signOut(auth);
    return null;  // user will be set to null upon successful logout
});

const initialState = {
    user: null,
    status: 'idle',
    error: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // ... You can keep the reducers as they are
    },
    extraReducers: (builder) => {
        builder
            // Handling login
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            
            // Handling logout
            .addCase(logoutUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.status = 'succeeded';
                state.user = null; // setting user to null after successful logout
                state.error = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(resetPassword.fulfilled, (state) => {
                state.status = 'succeeded';  // Optionally provide feedback to user
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            
            .addCase(loginAnonymously.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginAnonymously.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload; // this will set the user UID
                state.error = null;
            })
            .addCase(loginAnonymously.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
            
            
            
    }
});

export const { loginPending, loginSuccess, loginFailed, logout } = authSlice.actions;

export default authSlice.reducer;
