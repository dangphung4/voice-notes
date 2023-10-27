import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, registerUser, resetPassword, logoutUser } from './slices/authSlice'; // Adjust the path as needed
import './App.css';
function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('login'); // 'login', 'register', 'forgotPassword'

  const dispatch = useDispatch();
  const authState = useSelector(state => state.auth);

  const handleLogin = () => {
      dispatch(loginUser({ email, password }));
  };

  const handleRegister = () => {
      dispatch(registerUser({ email, password }));
  };

  const handlePasswordReset = () => {
      dispatch(resetPassword(email));
  };

  const handleLogout = () => {
      dispatch(logoutUser());
  };

  return (
      <div className="container">
          {authState.user ? (
              <>
                  <p>Welcome, {authState.user.email}</p>
                  <button onClick={handleLogout}>Logout</button>
              </>
          ) : (
              <>
                  {mode === 'login' && (
                      <div>
                          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                          <button onClick={handleLogin}>Login</button>
                          <button onClick={() => setMode('register')}>Register</button>
                          <button onClick={() => setMode('forgotPassword')}>Forgot Password?</button>
                      </div>
                  )}
                  {mode === 'register' && (
                      <div>
                          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                          <button onClick={handleRegister}>Sign Up</button>
                          <button onClick={() => setMode('login')}>Already have an account? Login</button>
                      </div>
                  )}
                  {mode === 'forgotPassword' && (
                      <div>
                          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                          <button onClick={handlePasswordReset}>Reset Password</button>
                          <button onClick={() => setMode('login')}>Back to Login</button>
                      </div>
                  )}
              </>
          )}
      </div>
  );
}

export default App;