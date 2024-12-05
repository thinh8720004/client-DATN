import React, { useState } from "react";
import "./AdditionalInfo.css";

import user1 from "../../../Assets/Users/user1.jpeg";

import Rating from "@mui/material/Rating";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import baseApi from "../../../utils/api";
import { border } from "@mui/system";

const AdditionalInfo = ({ product }) => {
  const [activeTab, setActiveTab] = useState("aiTab1");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reviewData = {
      productId: product._id,
      rating,
      comment,
    };
    try {
      const { data } = await baseApi.post("/reviews/add", reviewData);
      toast.success("Đánh giá sản phẩm thành công", {
        duration: 2000,
        style: {
          backgroundColor: "#07bc0c",
          color: "white",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#07bc0c",
        },
      });
      console.log(data);
    } catch (error) {
      console.log(error?.response?.data?.message);
      toast.error(error?.response?.data?.message, {
        duration: 2000,
        style: {
          backgroundColor: "#ff0000",
          color: "white",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#ff0000",
        },
      });
    }
  };
  return (
    <>
      <div className="productAdditionalInfo">
        <div className="productAdditonalInfoContainer">
          <div className="productAdditionalInfoTabs">
            <div className="aiTabs">
              <p
                onClick={() => handleTabClick("aiTab1")}
                className={activeTab === "aiTab1" ? "aiActive" : ""}
              >
                Mô tả
              </p>
              <p
                onClick={() => handleTabClick("aiTab2")}
                className={activeTab === "aiTab2" ? "aiActive" : ""}
              >
                Thông tin bổ sung
              </p>
              <p
                onClick={() => handleTabClick("aiTab3")}
                className={activeTab === "aiTab3" ? "aiActive" : ""}
              >
                Đánh giá ({product?.reviews?.length || 0})
              </p>
            </div>
          </div>
          <div className="productAdditionalInfoContent">
            {/* Tab1 */}

            {activeTab === "aiTab1" && (
              <div className="aiTabDescription">
                <div className="descriptionPara">
                  <h3>Hiệu Thuốc Gia đình 24pf</h3>
                  <p>
                    Chúng tôi tự hào là một trong những cửa hàng thuốc uy tín,
                    cung cấp các sản phẩm dược phẩm chất lượng cao, đảm bảo sức
                    khỏe cho cộng đồng. Với sứ mệnh mang lại sự an tâm và chăm
                    sóc sức khỏe cho mọi khách hàng, chúng tôi cung cấp một loạt
                    các sản phẩm thuốc, vitamin, thực phẩm chức năng, và các vật
                    tư y tế từ các thương hiệu nổi tiếng, được nhập khẩu chính
                    hãng từ các nhà sản xuất uy tín.
                  </p>
                </div>
                <div className="descriptionParaGrid">
                  <div className="descriptionPara">
                    <h3>Dịch Vụ Của Chúng Tôi:</h3>
                    <p>
                      <ul>
                        <li>
                          Tư Vấn Sức Khỏe: Đội ngũ dược sĩ giàu kinh nghiệm luôn
                          sẵn sàng tư vấn và giải đáp mọi thắc mắc về sản phẩm
                          cũng như cách sử dụng thuốc an toàn.
                        </li>
                        <li>
                          Sản Phẩm Chính Hãng: Tất cả các sản phẩm tại cửa hàng
                          đều được đảm bảo về nguồn gốc, xuất xứ và có đầy đủ
                          giấy tờ kiểm định chất lượng.
                        </li>
                        <li>
                          Giao Hàng Tận Nơi: Dịch vụ giao hàng nhanh chóng và
                          tiện lợi, giúp khách hàng có thể nhận sản phẩm ngay
                          tại nhà.
                        </li>
                      </ul>
                    </p>
                  </div>
                  <div className="descriptionPara">
                    <h3>Cam Kết Của Chúng Tôi</h3>
                    <p>
                      <ol>
                        <li>
                          Chất lượng và sự hài lòng của khách hàng là ưu tiên
                          hàng đầu. Mỗi sản phẩm chúng tôi cung cấp đều được
                          kiểm tra kỹ lưỡng, đảm bảo an toàn khi sử dụng. Hãy
                          đến với Cửa Hàng Thuốc XYZ để trải nghiệm dịch vụ chu
                          đáo, sản phẩm chất lượng và chăm sóc sức khỏe tối ưu.
                        </li>
                      </ol>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab2 */}

            {activeTab === "aiTab2" && (
              <div className="aiTabAdditionalInfo">
                <div className="additionalInfoContainer">
                  <h6>Nhà cung cấp: </h6>
                  <p style={{ fontWeight: border}}> {product.supplier.name}</p>
                </div>
                <div className="additionalInfoContainer">
                  <h6>Logo Thương hiệu</h6>
                  <img src={product.supplier.image} alt="" style={{ width: "100px" }}/>
                </div>
                <div className="additionalInfoContainer">
                  <h6>Địa chỉ</h6>
                  <p> {product.supplier.address}</p>
                </div>
                <div className="additionalInfoContainer">
                  <h6>Số điện thoại: </h6>
                  <p> {product.supplier.phone}</p>
                </div>
              </div>
            )}

            {/* Tab3 */}

            {activeTab === "aiTab3" && (
              <div className="aiTabReview">
                <div className="aiTabReviewContainer">
                  <h3>Đánh giá</h3>
                  <div className="userReviews">
                    {product?.reviews.map((review, index) => (
                      <div
                        key={index}
                        className="userReview"
                        style={{ borderBottom: "1px solid #e4e4e4" }}
                      >
                        <div className="userReviewImg">
                          <img src={user1} alt="" />
                        </div>
                        <div className="userReviewContent w-full">
                          <div className="userReviewTopContent">
                            <div className="userNameRating">
                              <h6>{review.user.name}</h6>
                              <div className="userRating">
                                <Rating
                                  name="simple-controlled"
                                  size="small"
                                  value={review.rating}
                                />
                              </div>
                            </div>
                            <div className="userDate">
                              <p>
                                Thời gian:{" "}
                                {new Date(review.createdAt).toLocaleDateString(
                                  "vi-VN",
                                  {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                  }
                                )}
                              </p>
                            </div>
                          </div>
                          <div className="userReviewBottomContent">
                            <p className="w-full">Đánh giá: {review.comment}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="userNewReview">
                    <div className="userNewReviewMessage">
                      <h5>Hãy là đánh giá cho sản phẩm: {product.title}</h5>
                      <p>
                        Địa chỉ email của bạn sẽ không được công bố. Các trường
                        bắt buộc được đánh dấu *
                      </p>
                    </div>
                    <div className="userNewReviewRating">
                      <label>Đánh giá của bạn *</label>
                      <Rating
                        name="simple-controlled"
                        size="small"
                        value={rating}
                        onChange={(event, newValue) => {
                          setRating(newValue);
                        }}
                      />
                    </div>
                    <div className="userNewReviewForm">
                      <form onSubmit={handleSubmit}>
                        <textarea
                          cols={30}
                          rows={8}
                          placeholder="Nhập đánh giá của bạn ..."
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          required
                        />

                        <button type="submit">Gửi</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdditionalInfo;
