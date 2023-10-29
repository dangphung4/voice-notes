import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import "./App.css";
import { LoginComponent } from "./components/LoginComponent";
import { RegisterComponent } from "./components/RegisterComponent";
import { ForgotPasswordComponent } from "./components/ForgotPasswordComponent";
import { UserProfileComponent } from "./components/UserProfileComponent";
import TranscriptionComponent from "./components/TranscriptionComponent";
import { useLocation } from 'react-router-dom';



function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login"); // 'login', 'register', 'forgotPassword'

  const authState = useSelector((state) => state.auth);
  const isLoggedIn = Boolean(authState.user);
  

  const renderModeComponent = () => {
    switch (mode) {
      case "login":
        return (
          <LoginComponent
            setEmail={setEmail}
            setPassword={setPassword}
            email={email}
            password={password}
          />
        );
      case "register":
        return (
          <RegisterComponent
            setEmail={setEmail}
            setPassword={setPassword}
            email={email}
            password={password}
          />
        );
      case "forgotPassword":
        return <ForgotPasswordComponent setEmail={setEmail} email={email} />;
      default:
        return null;
    }
  };

  const dispatch = useDispatch();

  const renderRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/transcribe" /> : renderModeComponent()} />
        <Route path="/login" element={isLoggedIn ? <Navigate to="/transcribe" /> : renderModeComponent()} />
        <Route path="/register" element={isLoggedIn ? <Navigate to="/transcribe" /> : renderModeComponent()} />
        <Route path="/forgot-password" element={isLoggedIn ? <Navigate to="/transcribe" /> : renderModeComponent()} />
        <Route path="/transcribe" element={<TranscriptionComponent uid={authState.user?.uid || ''} />} />
      </Routes>
    );
  };
  
  const RoutesWithStyles = () => {
    const location = useLocation();

    return (
<div className={`min-h-screen bg-gray-300 ${location.pathname === "/transcribe" ? '' : 'flex items-center justify-center'}`}>
        <div className={`${location.pathname === "/transcribe" ? '' : 'bg-white p-8 rounded-lg shadow-md w-96'}`}>
          {renderRoutes()}
          {mode === "login" && location.pathname !== "/transcribe" && (
            <button onClick={() => setMode("forgotPassword")}>Forgot Password?</button>
          )}
        </div>
      </div>
    );
  };

  return (
    <Router>
      <RoutesWithStyles />
    </Router>
  );
}
export default App;
