import { CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login, signup } from "../../../Features/Auth/authSlice";
import "./LoginSignUp.css";

const LoginSignUp = () => {
  const [activeTab, setActiveTab] = useState("tabButton1");
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const authError = useSelector((state) => state.auth.error);

  const handleTab = (tab) => {
    setActiveTab(tab);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log(credentials);
      await dispatch(login(credentials)).unwrap();
      navigate("/"); // Điều hướng đến trang chính
      window.location.reload(); // Làm mới trang để cập nhật trạng thái
    } catch (error) {
      console.error("Failed to login: ", error);
    }
  };  

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await dispatch(signup(userData)).unwrap();
      navigate(0);
    } catch (error) {
      console.error("Failed to signup: ", error);
    }
  };

  return (
    <div className="loginSignUpSection">
      <div className="loginSignUpContainer">
        <div className="loginSignUpTabs">
          <p
            onClick={() => handleTab("tabButton1")}
            className={activeTab === "tabButton1" ? "active" : ""}
          >
            Đăng nhập
          </p>
          <p
            onClick={() => handleTab("tabButton2")}
            className={activeTab === "tabButton2" ? "active" : ""}
          >
            Đăng kí
          </p>
        </div>
        <div className="loginSignUpTabsContent">
          {authError && <p style={{ color: "red" }}>{authError}</p>}
          {authStatus === "succeeded" && (
            <p style={{ color: "green" }}>Thành công! Chuyển hướng ...</p>
          )}
          {activeTab === "tabButton1" && (
            <div className="loginSignUpTabsContentLogin">
              <form onSubmit={handleLogin}>
                <input
                  type="email"
                  placeholder="Email *"
                  required
                  value={credentials.email}
                  onChange={(e) =>
                    setCredentials({ ...credentials, email: e.target.value })
                  }
                />
                <input
                  type="password"
                  placeholder="Mật khẩu *"
                  required
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials({
                      ...credentials,
                      password: e.target.value,
                    })
                  }
                />
                <div className="loginSignUpForgetPass">
                  <label>
                    <input type="checkbox" className="brandRadio" />
                    <p>Nhớ tôi</p>
                  </label>
                  <p>
                    <Link to="/resetPassword">Quên mật khẩu?</Link>
                  </p>
                </div>
                {authStatus === "loading" ? (
                  <CircularProgress />
                ) : (
                  <button type="submit">Đăng nhập</button>
                )}
              </form>
              <div className="loginSignUpTabsContentLoginText">
                <p>
                  Chưa có tài khoản?{" "}
                  <span onClick={() => handleTab("tabButton2")}>
                    Tạo tài khoản
                  </span>
                </p>
              </div>
            </div>
          )}
          {activeTab === "tabButton2" && (
            <div className="loginSignUpTabsContentRegister">
              <form onSubmit={handleSignup}>
                <input
                  type="text"
                  placeholder="Tên người dùng *"
                  required
                  value={userData.name}
                  onChange={(e) =>
                    setUserData({ ...userData, name: e.target.value })
                  }
                />
                <input
                  type="email"
                  placeholder="Email *"
                  required
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                />
                <input
                  type="password"
                  placeholder="Mật khẩu *"
                  required
                  value={userData.password}
                  onChange={(e) =>
                    setUserData({ ...userData, password: e.target.value })
                  }
                />
                <p>
                  Dữ liệu cá nhân của bạn sẽ được sử dụng để hỗ trợ trải nghiệm
                  của bạn trên toàn bộ trang web này, để quản lý quyền truy cập
                  vào tài khoản của bạn và cho các mục đích khác được mô tả
                  trong phần của chúng tôi.
                  <Link
                    to="/terms"
                    style={{ textDecoration: "none", color: "#c32929" }}
                  >
                    {" "}
                    Chính sách bảo mật
                  </Link>
                  .
                </p>
                {authStatus === "loading" ? (
                  <CircularProgress />
                ) : (
                  <button type="submit">Đăng ký</button>
                )}
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;
