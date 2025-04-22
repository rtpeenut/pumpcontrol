import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PumpControlPage from './pages/PumpControlPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/control" element={<PumpControlPage />} />
      </Routes>
    </Router>
  );
}

export default App;
