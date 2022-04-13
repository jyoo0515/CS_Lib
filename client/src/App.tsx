import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthHOC from 'hoc/auth';
import Navigation from 'components/views/Navigation';
import LandingPage from 'components/views/LandingPage';
import RegisterPage from 'components/views/RegisterPage';
import LoginPage from 'components/views/LoginPage';

function App() {
  return (
    <>
      <Navigation />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={AuthHOC(LandingPage, null)} />
          <Route path="/register" element={AuthHOC(RegisterPage, false)} />
          <Route path="/login" element={AuthHOC(LoginPage, false)} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
