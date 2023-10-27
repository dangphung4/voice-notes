import React from 'react';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../slices/authSlice'; 

export function ForgotPasswordComponent({ setEmail, email }) {
    const dispatch = useDispatch();

    const handlePasswordReset = () => {
        dispatch(resetPassword(email));
    };

    return (
        <div className="flex flex-col items-center space-y-4">
            <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Email" 
                className="p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 w-64"
            />
            <button 
                onClick={handlePasswordReset} 
                className="bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-500 transition-colors duration-200"
            >
                Reset Password
            </button>
        </div>
    );
}

