import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../slices/authSlice'; 

export function UserProfileComponent({ user }) {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    return (
        <div>
            <p>Welcome {user.email}</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}
