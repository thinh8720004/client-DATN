import React, { useState } from "react";
import "./ContactPage.css";

const ContactPage = () => {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setmessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Thank You ${name} for Contacting Us. We will Get Back to You Soon.\n\nYour Mail Id - ${email}.\nYour Message is - ${message}`
    );
    setname("");
    setEmail("");
    setmessage("");
  };

  return (
    <>
      <div className="contactSection">
        <h2>Liên hệ chúng tôi</h2>
        <div className="contactInfo">
          <div className="contactAddress">
            <div className="address">
              <h3>Hiệu thuốc gia đình 24pf</h3>
              <p>
                Đà Nẵng
              </p>
            </div>
          </div>
          <div className="contactForm">
            <h3>Liên hệ</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={name}
                placeholder="Nhập tên *"
                onChange={(e) => setname(e.target.value)}
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
                onChange={(e) => setmessage(e.target.value)}
              />
              <button type="submit">Gửi</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
