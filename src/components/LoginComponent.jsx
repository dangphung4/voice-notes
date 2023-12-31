import React from 'react';
import { useDispatch } from 'react-redux';
import { loginUser, loginAnonymously, registerUser } from '../slices/authSlice'; 
import { useNavigate } from 'react-router-dom';

export function LoginComponent({ setEmail, setPassword, email, password }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = () => {
        dispatch(loginUser({ email, password }));
        navigate("/transcribe");  
    };

    const handleAnonymousLogin = () => {
        dispatch(loginAnonymously());
        navigate("/transcribe");  
    };

    const handleRegister = () => {
        dispatch(registerUser({ email, password }));
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-center mb-4">Welcome to Transcriptify!</h1>
            <input 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Email" 
            />
            <input 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Password" 
            />
            <div className="flex h-10 space-x-3">
                <button 
                    className="flex-1 p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 active:bg-indigo-700 focus:outline-none focus:border-indigo-700 focus:ring focus:ring-indigo-200" 
                    onClick={handleLogin}
                >
                    Login
                </button>
                <button 
                    className="flex-1 p-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 active:bg-gray-700 focus:outline-none focus:border-gray-700 focus:ring focus:ring-gray-200" 
                    onClick={handleAnonymousLogin}
                >
                    Guest
                </button>
                <button 
                    className="flex-1 p-2 bg-green-600 text-white rounded-md hover:bg-green-500 active:bg-green-700 focus:outline-none focus:border-green-700 focus:ring focus:ring-green-200" 
                    onClick={handleRegister}
                >
                    Sign Up
                </button>
            </div>
        </div>
    );
}
