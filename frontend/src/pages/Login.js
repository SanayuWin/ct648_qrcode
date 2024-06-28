import React, { useState } from 'react';
import './SlideNavbar.css'; 

const BACKEND_SERVER = process.env.REACT_APP_BACKEND_SERVER;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(BACKEND_SERVER + "login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Handle successful login response
      const jsonData = await response.json();
      console.log('Login successful:', jsonData);
      // Redirect or handle success as needed
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Invalid credentials'); // or set error message based on response
    }
  };

  return (
    <div className="main">
      <div className="login">
        <form onSubmit={handleSubmit}>
          <label htmlFor="chk" aria-hidden="true">Login</label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            name="pswd"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

const LoginFormComponent = () => {
  return (
    <div className="App">
      <h1>Login Page</h1>
      <Login />
    </div>
  );
};

export default LoginFormComponent;