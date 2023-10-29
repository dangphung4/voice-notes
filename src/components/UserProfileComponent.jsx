import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../slices/authSlice';
import { selectTheme } from '../slices/themeSlice'; 
import { useNavigate } from 'react-router-dom';  // <-- Import this


export function UserProfileComponent({ user }) {
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const theme = useSelector(selectTheme);  // Get the current theme

    const handleLogout = () => {
        dispatch(logoutUser()).then(() => {
            navigate('/login');
        });
    };

    const themeStyles = theme === 'dark' ? {
        backgroundColor: "#333",
        color: "#f7f7f7"
    } : {
        backgroundColor: "#f7f7f7",
        color: "#333"
    };

    return (
        <div className="flex flex-col items-center space-y-4" style={themeStyles}>
            <p className="text-xl font-bold">Welcome {user.email}</p>
            <button 
                onClick={handleLogout} 
                className="bg-black text-white p-2 rounded-md hover:bg-gray-300 hover:text-black transition-colors duration-200"
            >
                Logout
            </button>
        </div>
    );
}