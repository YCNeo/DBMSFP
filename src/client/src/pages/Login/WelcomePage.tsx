import React from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
      <h1 className="text-primary mb-4">歡迎使用分帳系統</h1>
      <p className="lead text-center">管理您的分帳、消費與紀錄</p>
        <button className="btn btn-success w-100 mb-3" onClick={() => navigate('/login')}>
          Login
        </button>
        <button className="btn btn-primary w-100" onClick={() => navigate('/signup')}>
          Create an account
        </button>
    </div>
  );
};

export default WelcomePage;
