import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/Login/WelcomePage';
import LoginPage from './pages/Login/LoginPage';
import SignUpPage from './pages/Login/SignUpPage';
import HomePage from './pages/Home/HomePage';
import FriendListPage from './pages/Friend/FriendListPage';
import AccountingPage from './pages/Accounting/AccountingPage';
import SplitPage from './pages/Accounting/SplitPage';
import './App.css';
import ScorePage from './pages/ScorePage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/friendlist" element={<FriendListPage />} />
        <Route path="/accounting" element={<AccountingPage />} />
		<Route path="/split" element={<SplitPage />} />
        <Route path="/score" element={<ScorePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
