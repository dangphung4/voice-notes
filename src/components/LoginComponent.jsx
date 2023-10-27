import React from 'react';
import { useDispatch } from 'react-redux';
import { loginUser, loginAnonymously } from '../slices/authSlice'; 

export function LoginComponent({ setEmail, setPassword, email, password }) {
    const dispatch = useDispatch();

    const handleLogin = () => {
        dispatch(loginUser({ email, password }));
    };

    const handleAnonymousLogin = () => {
        dispatch(loginAnonymously());
    };

    return (
        <div>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleAnonymousLogin}>Login Anonymously</button>
        </div>
    );
}
