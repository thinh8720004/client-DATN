/** @format */

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import { ImFacebook, ImGoogle } from "react-icons/im";
import { login, signup } from "../../../Features/Auth/authSlice";
import "./LoginSignUp.css";

const LoginSignUp = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [userData, setUserData] = useState({ name: "", email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const authError = useSelector((state) => state.auth.error);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login(credentials)).unwrap();
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Login failed: ", error);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await dispatch(signup(userData)).unwrap();
      navigate(0);
    } catch (error) {
      console.error("Signup failed: ", error);
    }
  };

  return (
    <div className="flex items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-700 text-center mb-4">
          {isLogin ? "Đăng nhập" : "Đăng ký"}
        </h1>
        {authError && <p className="text-red-500 text-center">{authError}</p>}
        {authStatus === "succeeded" && (
          <p className="text-green-500 text-center">Thành công! Chuyển hướng ...</p>
        )}
        <form onSubmit={isLogin ? handleLogin : handleSignup}>
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-gray-600">Tên người dùng</label>
              <input
                type="text"
                className="input-field"
                placeholder="Tên người dùng *"
                value={userData.name}
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                required
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-600">Email</label>
            <input
              type="email"
              className="input-field"
              placeholder="Email *"
              value={isLogin ? credentials.email : userData.email}
              onChange={(e) =>
                isLogin
                  ? setCredentials({ ...credentials, email: e.target.value })
                  : setUserData({ ...userData, email: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600">Mật khẩu</label>
            <input
              type="password"
              className="input-field"
              placeholder="Mật khẩu *"
              value={isLogin ? credentials.password : userData.password}
              onChange={(e) =>
                isLogin
                  ? setCredentials({ ...credentials, password: e.target.value })
                  : setUserData({ ...userData, password: e.target.value })
              }
              required
            />
          </div>
          {authStatus === "loading" ? (
            <div className="flex justify-center">
              <CircularProgress />
            </div>
          ) : (
            <button
              type="submit"
              className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              {isLogin ? "Đăng nhập" : "Đăng ký"}
            </button>
          )}
        </form>
        <hr className="my-6" />
        <button className="btn-social bg-blue-600 text-white" disabled>
          <ImFacebook className="mr-2" />
          Đăng nhập với Facebook
        </button>
        <button className="btn-social bg-red-500 text-white mt-2" disabled>
          <ImGoogle className="mr-2" />
          Đăng nhập với Google
        </button>
        <p className="mt-6 text-center text-gray-600">
          {isLogin ? (
            <>
              Chưa có tài khoản?{" "}
              <span
                onClick={() => setIsLogin(false)}
                className="text-green-500 cursor-pointer hover:underline"
              >
                Tạo tài khoản
              </span>
            </>
          ) : (
            <>
              Đã có tài khoản?{" "}
              <span
                onClick={() => setIsLogin(true)}
                className="text-green-500 cursor-pointer hover:underline"
              >
                Đăng nhập
              </span>
            </>
          )}
        </p>
        <p className="text-center mt-2">
          <Link
            to="/resetPassword"
            className="text-sm text-green-500 hover:underline"
          >
            Quên mật khẩu?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginSignUp;
