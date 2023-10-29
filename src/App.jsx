import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme, selectTheme } from './slices/themeSlice'; 
import "./App.css";
import { LoginComponent } from "./components/LoginComponent";
import { RegisterComponent } from "./components/RegisterComponent";
import { ForgotPasswordComponent } from "./components/ForgotPasswordComponent";
import { UserProfileComponent } from "./components/UserProfileComponent";
import TranscriptionComponent from "./components/TranscriptionComponent";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login"); // 'login', 'register', 'forgotPassword'

  const authState = useSelector((state) => state.auth);

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

  const theme = useSelector(selectTheme);
  const dispatch = useDispatch();

  if (theme === 'light') {
    document.body.classList.remove('dark-mode');
    document.body.classList.add('light-mode');
  } else {
    document.body.classList.remove('light-mode');
    document.body.classList.add('dark-mode');
  }

  return (
    <div className={`flex flex-col items-center space-y-4 user-profile ${themeClass}`}>
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <div className="container">
          {authState.user ? (
            <>
              <UserProfileComponent user={authState.user} />
              <TranscriptionComponent uid={authState.user.uid} />{" "}
              {/* <-- Add this line */}
            </>
          ) : (
            <>
              {mode === "login" && (
                <LoginComponent
                  setEmail={setEmail}
                  setPassword={setPassword}
                  email={email}
                  password={password}
                />
              )}
              {mode === "register" && (
                <RegisterComponent
                  setEmail={setEmail}
                  setPassword={setPassword}
                  email={email}
                  password={password}
                />
              )}
              {mode === "forgotPassword" && (
                <ForgotPasswordComponent setEmail={setEmail} email={email} />
              )}

              <button
                onClick={() => setMode("register")}
                className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-500 transition-colors duration-200 w-full mt-4"
              >
                Register
              </button>
              <button
                onClick={() => setMode("forgotPassword")}
                className="bg-red-600 text-white p-2 rounded-md hover:bg-red-500 transition-colors duration-200 w-full mt-4"
              >
                Forgot Password
              </button>
            </>
          )}
        </div>
      </div>
      <button
        onClick={() => dispatch(toggleTheme())}
        className="mt-4 bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-400 transition-colors duration-200"
      >
        Toggle Theme
      </button>
    </div>
    </div>
  );
}

export default App;
