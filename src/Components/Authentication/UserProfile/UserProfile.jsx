import React, { useState } from "react";
import axios from "axios";
import OrderTable from "./OrderTable";
import { toast } from "react-hot-toast";

const UserProfile = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [userInfo, setUserInfo] = useState(storedUser || {});
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false); // Trạng thái tải ảnh

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };
  const  isVietnamesePhoneNumberValid = (number) => {
    return /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/.test(number);
  }
  const handleSave = async () => {
    try {
      if(!isVietnamesePhoneNumberValid(userInfo.phone)){
        toast.error("Số điện thoại không hợp lệ");
        return;
      }
      const response = await axios.put(
        `http://localhost:3002/customer/${userInfo._id}`,
        userInfo
      );
      console.log(response.data);
      toast.success("Thông tin đã được cập nhật!");

      // Cập nhật lại localStorage với thông tin mới
      localStorage.setItem("user", JSON.stringify(userInfo));

      setIsEditing(false); // Tắt chế độ chỉnh sửa
    } catch (error) {
      console.error("Lỗi cập nhật thông tin:", error);
      toast.error("Cập nhật thất bại!");
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  if (!userInfo) {
    return <div>Không có dữ liệu người dùng.</div>;
  }

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "kenny06");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dmklmvxkr/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const response = await res.json();
      const imageUrl = response.url;

      // Cập nhật ảnh trong state của userInfo
      setUserInfo((prev) => ({ ...prev, image: imageUrl }));

      // Gửi yêu cầu cập nhật đến MongoDB
      await axios.put(`http://localhost:3002/customer/${userInfo._id}`, {
        ...userInfo,
        image: imageUrl,
      });

      toast.success("Ảnh đã được tải lên và cập nhật thành công!");

      // Cập nhật lại localStorage với thông tin mới
      localStorage.setItem(
        "user",
        JSON.stringify({ ...userInfo, avatar: imageUrl })
      );
    } catch (error) {
      console.error("Lỗi khi upload ảnh:", error);
      toast.error("Upload ảnh thất bại!");
    } finally {
      setIsUploading(false); // Tắt trạng thái chờ
    }
  };

  return (
    <>
      <div className="container mx-auto px-20 py-10">
        <div className="flex justify-between items-center mb-6">
          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" className="text-gray-600">
            <ol className="flex space-x-2">
              <li>
                <a href="/" className="text-blue-600 hover:text-blue-800">
                  TRANG CHỦ /{" "}
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-600 hover:text-blue-800">
                  THÔNG TIN TÀI KHOẢN
                </a>
              </li>
            </ol>
          </nav>
        </div>

        <div className="flex flex-wrap -mx-4">
          {/* Left Side (Profile Picture) */}
          <div className="w-full md:w-1/3 mb-8 md:mb-0 px-10">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <img
                src={
                  userInfo.image ||
                  "https://bootdey.com/img/Content/avatar/avatar7.png"
                }
                alt="User"
                className="rounded-full w-32 h-32 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">
                Tài khoản: {userInfo.name}
              </h3>
              <div className="mt-4">
                {/* Input file with custom styling */}
                <label
                  className={`inline-block px-4 py-2 rounded-md cursor-pointer bg-blue-600 text-white ${
                    isUploading && "opacity-50 cursor-wait"
                  }`}
                >
                  {isUploading ? (
                    "Đang tải ảnh..."
                  ) : (
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className="w-6 h-6 mr-2" // Kích thước và lề bên phải cho icon
                        fill="white" // Đặt màu trắng cho SVG
                      >
                        <path d="M288 109.3L288 352c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-242.7-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352l128 0c0 35.3 28.7 64 64 64s64-28.7 64-64l128 0c35.3 0 64 28.7 64 64l0 32c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64l0-32c0-35.3 28.7-64 64-64zM432 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" />
                      </svg>
                      Tải ảnh lên
                    </div>
                  )}
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileUpload}
                    disabled={isUploading}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Right Side (User Info) */}
          <div className="w-full md:w-2/3 px-4 text-[19px]">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="space-y-4 p-6">
                <div className="flex">
                  <h6 className="font-semibold text-gray-700 w-72">Tên: </h6>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={userInfo.name}
                      onChange={handleChange}
                      className="w-full text-gray-700 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
                    />
                  ) : (
                    <p className="text-gray-500">{userInfo.name}</p>
                  )}
                </div>

                {/* <div className="flex">
                  <h6 className="font-semibold text-gray-700 w-72">Email: </h6>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={userInfo.email}
                      onChange={handleChange}
                      className="w-full text-gray-700 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
                    />
                  ) : (
                    <p className="text-gray-500">{userInfo.email}</p>
                  )}
                </div> */}

                <div className="flex">
                  <h6 className="font-semibold text-gray-700 w-72">
                    Số điện thoại:{" "}
                  </h6>
                  {isEditing ? (
                    <input
                      type="text"
                      name="phone"
                      value={userInfo.phone}
                      onChange={handleChange}
                      className="w-full text-gray-700 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
                    />
                  ) : (
                    <p className="text-gray-500">{userInfo.phone}</p>
                  )}
                </div>

                <div className="flex">
                  <h6 className="font-semibold text-gray-700 w-72">
                    Địa chỉ:{" "}
                  </h6>
                  {isEditing ? (
                    <input
                      type="text"
                      name="address"
                      value={userInfo.address}
                      onChange={handleChange}
                      className="w-full text-gray-700 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
                    />
                  ) : (
                    <p className="text-gray-500">{userInfo.address}</p>
                  )}
                </div>

                <div className="mt-6">
                  {isEditing ? (
                    <button
                      onClick={handleSave}
                      className="bg-blue-600 text-white px-4 py-2 w-32 rounded-md hover:bg-blue-700 mr-2"
                    >
                      Lưu
                    </button>
                  ) : (
                    <button
                      onClick={handleEdit}
                      className="bg-blue-600 text-white px-4 py-2 w-32 rounded-md hover:bg-blue-700 mr-2"
                    >
                      Cập nhật
                    </button>
                  )}
                  {isEditing && (
                    <button
                      onClick={() => setIsEditing(false)}
                      className="ml-2 bg-gray-500 text-white px-4 py-2 w-32 rounded-md hover:bg-gray-600 transition duration-200 ease-in-out"
                    >
                      Hủy
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-20 py-10">
        <OrderTable />
      </div>
    </>
  );
};

export default UserProfile;
