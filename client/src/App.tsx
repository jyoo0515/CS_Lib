import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navigation from 'components/views/Navigation';
import LandingPage from 'components/views/LandingPage';
import RegisterPage from 'components/views/RegisterPage';
import LoginPage from 'components/views/LoginPage';

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
