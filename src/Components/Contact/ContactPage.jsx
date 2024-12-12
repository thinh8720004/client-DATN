import React, { useState } from "react";
import axios from "axios";
import "./ContactPage.css";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(""); // To handle success or error messages

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name,
      email,
      message,
    };

    try {
      setStatus("loading");
      const response = await axios.post("http://localhost:3002/contact/", formData);
      if (response.status === 200) {
        setStatus("success");
        alert("Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm.");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        throw new Error("Unexpected response status");
      }
    } catch (error) {
      setStatus("error");
      alert("Đã xảy ra lỗi khi gửi thông tin. Vui lòng thử lại sau.");
    }
  };

  return (
    <div className="contactSection">
      <h2>Liên hệ chúng tôi</h2>
      <div className="contactInfo">
        <div className="contactAddress">
          <div className="address">
            <h3>Hiệu thuốc gia đình 24pf</h3>
            <p>Đà Nẵng</p>
          </div>
        </div>
        <div className="contactForm">
          <h3>Liên hệ</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={name}
              placeholder="Nhập tên *"
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              value={email}
              placeholder="Nhập email *"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <textarea
              rows={10}
              cols={40}
              placeholder="Lời nhắn của bạn *"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <button type="submit" disabled={status === "loading"}>
              {status === "loading" ? "Đang gửi..." : "Gửi"}
            </button>
          </form>
          {status === "success" && <p className="success">Gửi thông tin thành công!</p>}
          {status === "error" && <p className="error">Đã xảy ra lỗi, vui lòng thử lại.</p>}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;