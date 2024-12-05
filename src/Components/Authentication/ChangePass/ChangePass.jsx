import React, { useState } from "react";
import axios from "axios"; // Đảm bảo bạn đã cài axios nếu sử dụng
import { Link } from "react-router-dom";
import "../Reset/ResetPass.css";

const ChangePass = () => {
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra xem mật khẩu mới và xác nhận mật khẩu có khớp không
    if (newPassword !== confirmPassword) {
      setError("Mật khẩu mới và xác nhận mật khẩu không khớp!");
      return;
    }

    // Gửi yêu cầu thay đổi mật khẩu đến backend
    try {
      const response = await axios.post("http://localhost:3002/customer/change-password", {
        email,
        currentPassword,
        newPassword,
      });

      if (response.data.status) {
        setMessage(response.data.message);
        setError(""); // Xóa lỗi nếu có thông báo thành công
      } else {
        setError(response.data.message);
        setMessage(""); // Xóa thông báo thành công nếu có lỗi
      }
    } catch (err) {
      setError("Đã xảy ra lỗi khi thay đổi mật khẩu.");
      setMessage(""); // Xóa thông báo thành công nếu có lỗi
    }
  };

  return (
    <div>
      <div className="resetPasswordSection">
        <h2>Thay đổi mật khẩu</h2>
        <div className="resetPasswordContainer">
          <p>Hãy thay đổi mật khẩu của bạn để tăng tính bảo mật</p>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Nhập email *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Nhập mật khẩu cũ *"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Nhập mật khẩu mới *"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Xác thực mật khẩu mới *"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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

export default ChangePass;
