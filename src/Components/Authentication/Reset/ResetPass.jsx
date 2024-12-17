import React, { useState } from "react";
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
        body: JSON.stringify({ email }),
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
    <div className="flex items-center min-h-screen p-6 bg-gray-100">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-800">
                Đặt lại mật khẩu
              </h1>
              <p className="mb-6 text-gray-600">
                Chúng tôi sẽ gửi cho bạn một email để đặt lại mật khẩu của bạn.
              </p>
              <form onSubmit={handleSubmit} className="auth-form">
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input 
                    type="email"
                    id="email"
                    className="block w-full mt-1 text-sm border-gray-300 bg-gray-100 text-gray-900 form-input"
                    placeholder="Nhập email *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-green-500 border border-transparent rounded-lg active:bg-green-600 hover:bg-green-600 focus:outline-none focus:shadow-outline-green"
                >
                  Gửi
                </button>
              </form>
              {message && (
                <p className="mt-4 text-sm text-green-600">
                  {message}
                </p>
              )}
              {error && (
                <p className="mt-4 text-sm text-red-600">
                  {error}
                </p>
              )}
              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-green-500 hover:underline"
                  to="/loginSignUp"
                >
                  Quay lại Đăng nhập
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ResetPass;
