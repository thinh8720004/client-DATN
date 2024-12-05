import React, { useState } from "react";
import "./ResetPass.css";
import { Link } from "react-router-dom";

const ResetPass = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3002/customer/reset-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }), // Chỉ cần gửi email
      });
  
      const data = await response.json();
      if (data.status) {
        setMessage(data.message);
        setError("");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Đã xảy ra lỗi! Vui lòng thử lại sau.");
    }
  };
  
  

  return (
    <div>
      <div className="resetPasswordSection">
        <h2>Đặt lại mật khẩu</h2>
        <div className="resetPasswordContainer">
          <p>Chúng tôi sẽ gửi cho bạn một email để đặt lại mật khẩu của bạn</p>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Nhập email *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Gửi</button>
          </form>
          {message && <p className="successMessage">{message}</p>}
          {error && <p className="errorMessage">{error}</p>}
        </div>
        <p>
          Quay lại{" "}
          <Link to="/loginSignUp">
            <span>Đăng nhập</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPass;
