import React from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../slices/authSlice'; 

export function RegisterComponent({ setEmail, setPassword, email, password }) {
    const dispatch = useDispatch();

    const handleRegister = () => {
        dispatch(registerUser({ email, password }));
    };

    return (
        <div className="flex flex-col space-y-4">
            <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Email"
                className="p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 w-full" 
            />
            <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Password"
                className="p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 w-full" 
            />
            <button 
                onClick={handleRegister} 
                className="bg-green-600 text-white p-2 rounded-md hover:bg-green-500 transition-colors duration-200 w-full"
            >
                Sign Up
            </button>
        </div>
    );
}
