import React from 'react';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../slices/authSlice'; 

export function ForgotPasswordComponent({ setEmail, email }) {
    const dispatch = useDispatch();

    const handlePasswordReset = () => {
        dispatch(resetPassword(email));
    };

    return (
        <div>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <button onClick={handlePasswordReset}>Reset Password</button>
        </div>
    );
}
