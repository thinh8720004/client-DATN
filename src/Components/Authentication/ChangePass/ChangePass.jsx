import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import "./ChangePass.css"; // Assuming you use the same CSS as LoginSignUp

const ChangePass = () => {
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Mật khẩu mới và xác nhận mật khẩu không khớp!");
      setMessage("");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3002/customer/change-password",
        { email, currentPassword, newPassword }
      );

      if (response.data.status) {
        setMessage(response.data.message);
        setError("");
      } else {
        setError(response.data.message);
        setMessage("");
      }
    } catch (err) {
      setError("Đã xảy ra lỗi khi thay đổi mật khẩu.");
      setMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-700 text-center mb-4">
          Thay đổi mật khẩu
        </h1>
        {message && <p className="text-green-500 text-center">{message}</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="mb-4">
            <label className="block text-gray-600">Email</label>
            <input
              type="email"
              className="input-field"
              placeholder="Nhập email *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600">Mật khẩu cũ</label>
            <input
              type="password"
              className="input-field"
              placeholder="Nhập mật khẩu cũ *"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600">Mật khẩu mới</label>
            <input
              type="password"
              className="input-field"
              placeholder="Nhập mật khẩu mới *"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600">Xác nhận mật khẩu mới</label>
            <input
              type="password"
              className="input-field"
              placeholder="Xác thực mật khẩu mới *"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {loading ? (
            <div className="flex justify-center">
              <CircularProgress />
            </div>
          ) : (
            <button
              type="submit"
              className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Gửi
            </button>
          )}
        </form>
        <p className="mt-6 text-center text-gray-600">
          Quay lại{" "}
          <Link
            to="/loginSignUp"
            className="text-green-500 cursor-pointer hover:underline"
          >
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ChangePass;
