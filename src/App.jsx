import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import { LoginComponent } from './components/LoginComponent';
import { RegisterComponent } from './components/RegisterComponent';
import { ForgotPasswordComponent } from './components/ForgotPasswordComponent';
import { UserProfileComponent } from './components/UserProfileComponent';

function App() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mode, setMode] = useState('login'); // 'login', 'register', 'forgotPassword'

    const authState = useSelector(state => state.auth);

    const renderModeComponent = () => {
        switch (mode) {
            case 'login':
                return <LoginComponent setEmail={setEmail} setPassword={setPassword} email={email} password={password} />;
            case 'register':
                return <RegisterComponent setEmail={setEmail} setPassword={setPassword} email={email} password={password} />;
            case 'forgotPassword':
                return <ForgotPasswordComponent setEmail={setEmail} email={email} />;
            default:
                return null;
        }
    };

    return (
        <div className="container">
            {authState.user ? <UserProfileComponent user={authState.user} /> : renderModeComponent()}
        </div>
    );
}

export default App;
