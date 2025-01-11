import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WelcomePage from '../pages/Login/WelcomePage';
import LoginPage from '../pages/Login/LoginPage';
import SignUpPage from '../pages/Login/SignUpPage';
import HomePage from '../pages/Home/HomePage';

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/homepage" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
