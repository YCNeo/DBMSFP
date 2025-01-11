import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [domain, setDomain] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>(""); /* 存取錯誤訊息 */
  const [currentImage, setCurrentImage] = useState("/assets/hide.png");

  /* 驗證有效輸入 */
  const validateInputs = (): string => {
    if (!username) {
      return "Enter an username";
    }
    if (!password) {
      return "Enter a password";
    }
    if (password.length < 8) {
      return "Use 8 characters or more for your password";
    }
    return "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateInputs();
    if (validationError) {
      setError(validationError); /* 設置錯誤訊息 */
      return;
    }
    setError(""); /* 清除錯誤訊息 */

    // 從 localStorage 取出已存在的用戶列表
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const newUser = { username, password }; // 新註冊的用戶
    const updatedUsers = [...existingUsers, newUser];

    // 將更新後的用戶列表存回 localStorage
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // 提示註冊成功並跳轉到登入頁
    alert("Registration successful! You can now log in.");
    navigate("/login");
  };

  /* 獲取導航函數 */
  const navigate = useNavigate();

  /* 改變密碼顯示狀態 */
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [imageVisible, setImageVisible] = useState(false);

  /* 切換密碼顯示或隱藏 */
  const handleShowPassword = () => {
    setPasswordVisible(true);
    setImageVisible(true);
    setTimeout(() => {
      setPasswordVisible(false);
      setCurrentImage("/assets/hide.png");
    }, 1000); /* 設置為1sec後隱藏 */
    setCurrentImage((prevImage) =>
      prevImage === "/assets/hide.png"
        ? "/assets/witness.png"
        : "/assets/hide.png"
    );            
  };

  return (
    <div className="container mt-5">
      <h2 className="text-start text-primary fw-bold mb-4">
        Create an account
      </h2>
      <form
        className="text-start"
        style={{ maxWidth: "400px" }}
        onSubmit={handleSubmit}
      >
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <div className="input-group">
            {/* 輸入框 */}
            <input
              type="text"
              className="form-control"
              id="email"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* @ */}
            <span className="input-group-text">@</span>
            {/* 下拉式選單 */}
            <select
              className="form-select"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
            >
              <option value="gmail.com">gmail.com</option>
              <option value="yahoo.com">yahoo.com</option>
              <option value="outlook.com">outlook.com</option>
              <option value="icloud.com">icloud.com</option>
              <option value="custom.com">custom.com</option>
            </select>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <div className="input-group">
            <input
              type={passwordVisible ? "text" : "password"} // 動態設置輸入框類型
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
                  width: "24px",
                  height: "24px",
                }}
              />
            </button>
          </div>
        </div>
        {error && (
          <div
            className="btn alert alert-danger"
            style={{
              width: "400px",
              /* overflowWrap='break-word', /*長字串自動換行*/
            }}
          >
            {error}
          </div>
        )}{" "}
        {/* 顯示錯誤訊息 */}
        <button type="submit" className="btn btn-primary w-100 mb-3">
          GET STARTED
        </button>
        <button
          type="button"
          className="btn btn-light w-100"
          onClick={() => navigate("/Login")}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
