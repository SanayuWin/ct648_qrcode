import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';

// Components
import LoginFormComponent from './pages/Login'; 

function App() {
  return (
    <Router>
      <main>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/login" element={<LoginFormComponent />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
