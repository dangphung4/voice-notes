import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../slices/authSlice'; 

export function UserProfileComponent({ user }) {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    return (
        <div className="flex flex-col items-center space-y-4">
            <p className="text-xl font-bold">Welcome {user.email}</p>
            <button 
                onClick={handleLogout} 
                className="bg-green-600 text-white p-2 rounded-md hover:bg-red-500 transition-colors duration-200"
            >
                Logout
            </button>
        </div>
    );
}
