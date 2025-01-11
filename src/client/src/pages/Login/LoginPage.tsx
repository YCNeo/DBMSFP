import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
/* import witnessIcon from '../../assets/hide.png'; */

const LoginPage: React.FC = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>('');/* 存取錯誤訊息 */
  const [currentImage, setCurrentImage] = useState('/assets/hide.png');

  // 模擬用戶數據
  const mockUsers = [
    { username: 'testuser', password: 'testpassword' },
    { username: 'admin', password: 'adminpassword' },
  ];

  /* 驗證有效輸入 */
  const validateInputs = (): string => {
    if (!username) {
      return 'Enter an username';
    }
    if (!password) {
      return 'Enter a password';
    }
    /*if (password.length < 8) {
      return 'Use 8 characters or more for your password';
    }*/
    return '';
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateInputs();
    if (validationError) {
      setError(validationError); /* 設置錯誤訊息 */
      return;
    }
    setError(''); /* 清除錯誤訊息 */

    // 從 localStorage 中讀取用戶列表
  const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');

  // 驗證用戶是否存在
  const userExists = existingUsers.find(
    (user: { username: string; password: string }) =>
      user.username === username && user.password === password
  );

  if (userExists) {
    navigate('/homepage'); // 跳轉到 HomePage
  } else {
    setError('Invalid username or password'); // 顯示錯誤訊息
  }

    /*console.log('登入資訊:', { username, password });

    if (username === 'test' && password === 'password') {
      navigate('/homepage'); // 跳轉到 HomePage
    } else {
      setError('Invalid username or password');
    }*/

  };

  

  /* 獲取導航函數 */
  const navigate = useNavigate(); 

  /* 改變密碼圖示顯示狀態 */
  const [passwordVisible, setPasswordVisible]=useState(false);
  const [imageVisible, setImageVisible]=useState(false);

  /* 切換密碼顯示或隱藏 */
  const handleShowPassword = () => {
    setPasswordVisible(true);
    setImageVisible(true)
    setTimeout(() => {
      setPasswordVisible(false);
      setCurrentImage('/assets/hide.png');
    },1000);/* 設置為1sec後隱藏 */
    setCurrentImage((prevImage) =>
      prevImage === '/assets/hide.png' ? '/assets/witness.png' : '/assets/hide.png'
    );
  };
  /* const handleShowPassword = () => {
    setPasswordVisible(!passwordVisible); // 每次點擊切換顯示狀態
  }; */

  return (
    /* 定義一個容器<div> */
    <div className="container mt-5">
      <button
          type="button"
          className="btn btn-outline"
          style={{ 
            position: 'absolute',  // 固定定位
            top: '10px',        // 頂部距離
            left: '10px',       // 左側距離
            zIndex: 1000 
          }}
          onClick={() => navigate('/')} // 跳回welcomePage
        >
          <img 
                src="/assets/back.png"
                style={{ 
                  width: '24px', 
                  height: '24px' 
                }} 
              />
      </button>
      <h2 className="text-start text-success fw-bold mb-4"
      >Login</h2>
      <form className="text-start" style={{ maxWidth: '400px' }} onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input type="text" 
            className="form-control" 
            id="username" 
            placeholder="Enter your username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <div className="input-group">
            <input
              type={passwordVisible ? 'text' : 'password'} // 動態設置輸入框類型
              className="form-control"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="btn btn-outline-secondary" 
              onClick={handleShowPassword} // 點擊切換顯示狀態
            >
              <img 
                src={currentImage}
                style={{ 
                  width: '24px', 
                  height: '24px' 
                }} 
              />
              {/* {passwordVisible ? '隱藏' : '顯示'} */}
            </button>
          </div>
        </div>
        {error && <div 
          className="btn alert alert-danger"
          style={{
            width: '400px',
          }}
        >
        {error}
        </div>} {/* 顯示錯誤訊息 */}
        <button 
          type="submit" 
          className="btn btn-success w-100">Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
