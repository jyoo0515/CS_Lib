import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navigation from 'components/views/Navigation';
import LandingPage from 'components/views/LandingPage';

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </>
  );
}

export default App;
