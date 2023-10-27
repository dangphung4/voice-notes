import React from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../slices/authSlice'; 

export function RegisterComponent({ setEmail, setPassword, email, password }) {
    const dispatch = useDispatch();

    const handleRegister = () => {
        dispatch(registerUser({ email, password }));
    };

    return (
        <div>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button onClick={handleRegister}>Sign Up</button>
        </div>
    );
}
