import React, { useEffect, useState,useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCartItems,
  removeFromCart,
  selectCartTotalAmount,
  updateQuantity,
} from "../../Features/Cart/cartSlice";
import "./ShoppingCart.css";

import { MdOutlineClose } from "react-icons/md";

import { Link } from "react-router-dom";

import success from "../../Assets/success.png";
import baseApi from "../../utils/api";

const ShoppingCart = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  console.log(storedUser);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const [activeTab, setActiveTab] = useState("cartTab1");
  const [payments, setPayments] = useState(false);
  const [formData, setFormData] = useState({
    firstName: storedUser.name,
    lastName: "",
    address:  storedUser.address,
    city: "",
    postcode: "",
    contact: storedUser.phone,
    email: "",
    orderNotes: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const handleTabClick = (tab) => {
    if (tab === "cartTab1" || cartItems.length > 0) {
      setActiveTab(tab);
    }
  };
  

  const handleQuantityChange = (productId, quantity) => {
    if (quantity >= 1 && quantity <= 100) {
      dispatch(updateQuantity({ productId, quantity }));
    }
  };
  
  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);

  const handleUpdateQuantity = (productId, newQuantity) => {
    dispatch(updateQuantity({ productId, newQuantity })).then(() => {
      dispatch(getCartItems()); 
    });
  };

  const totalPrice = cartItems.reduce((total, item) => {
    const price = item.product?.prices?.price || 0; 
    const quantity = item.quantity || 0; 

    return total + price * quantity;
  }, 0);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const orderData = {
        billing: {
          name: formData.firstName + " " + formData.lastName,
          address: formData.address,
          city: formData.city,
          zipCode: formData.postcode,
          contact: formData.contact,
          email: formData.email,
        },
        cart: cartItems,
        totalPrice,
        paymentMethod: selectedPayment,
        selectedPayment,
        shippingCost: 10,
      };

      const res = await baseApi.post("/order/add", orderData);
      if (res.status === 201) {
        if (selectedPayment === "cod") {
        } else {
          console.log(selectedPayment);
          const url = await baseApi.post("/order/payment-momo", {
            total: totalPrice,
            orderId: res.data.order._id,
          });
          window.open(url.data.data.shortLink, "_blank");
        }
        setPayments(true);
        handleTabClick("cartTab3");
      }
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const  isVietnamesePhoneNumberValid = (number) => {
    return /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/.test(number);
  }
  // current Date
  const validateForm = () => {
    const errors = {};
    if (!formData.firstName) errors.firstName = "Tên là bắt buộc";
    // if (!formData.lastName) errors.lastName = "Last Name is required";
    if (!formData.address) errors.address = "Địa chỉ đường phố là bắt buộc";
    // if (!formData.city) errors.city = "City is required";
    // if (!formData.postcode) errors.postcode = "Postcode is required";
    if (!formData.contact) errors.contact = "Cần phải liên hệ";
    // if (!formData.email) errors.email = "Email is required";
    if(!isVietnamesePhoneNumberValid(formData.contact)){
      errors.contact = "Số điện thoại không hợp lệ";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const currentDate = new Date();

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Random number
  const orderNumber = Math.floor(Math.random() * 100000);

  // Radio Button Data
  const [selectedPayment, setSelectedPayment] = useState("cod");

  const handlePaymentChange = (e) => {
    setSelectedPayment(e.target.value);
  };
  const ProductTitle = React.memo(({ title }) => {
    return <h4>{title}</h4>;
  });
  return (
    <div>
      
      <div className="shoppingCartSection">
        <h2>Giỏ hàng</h2>

        <div className="shoppingCartTabsContainer">
          <div className={`shoppingCartTabs ${activeTab}`}>
            <button
              className={activeTab === "cartTab1" ? "active" : ""}
              onClick={() => {
                handleTabClick("cartTab1");
                setPayments(false);
              }}
            >
              <div className="shoppingCartTabsNumber">
                <h3>01.</h3>
                <div className="shoppingCartTabsHeading">
                  <h3>Giỏ hàng của bạn</h3>
                  <p>Quản lý danh sách mặt hàng của bạn</p>
                </div>
              </div>
            </button>
            <button
              className={activeTab === "cartTab2" ? "active" : ""}
              onClick={() => {
                handleTabClick("cartTab2");
                setPayments(false);
              }}
              disabled={cartItems.length === 0}
            >
              <div className="shoppingCartTabsNumber">
                <h3>02.</h3>
                <div className="shoppingCartTabsHeading">
                  <h3>Vận chuyển và thanh toán</h3>
                  <p>Kiểm tra danh sách mặt hàng của bạn</p>
                </div>
              </div>
            </button>
            <button
              className={activeTab === "cartTab3" ? "active" : ""}
              onClick={() => {
                handleTabClick("cartTab3");
              }}
              disabled={cartItems.length === 0 || payments === false}
            >
              <div className="shoppingCartTabsNumber">
                <h3>03.</h3>
                <div className="shoppingCartTabsHeading">
                  <h3>Xác nhận</h3>
                  <p>Xác nhận và gửi đơn đặt hàng của bạn</p>
                </div>
              </div>
            </button>
          </div>
          <div className="shoppingCartTabsContent">
            {/* tab1 */}
            {activeTab === "cartTab1" && (
              <div className="shoppingBagSection">
                <div className="shoppingBagTableSection">
                  {/* For Desktop Devices */}
                  
                  <table className="shoppingBagTable">
                    <thead>
                      <tr>
                        <th>Sản phẩm</th>
                        <th></th>
                        <th>Giá</th>
                        <th>Số lượng</th>
                        <th>Tổng tiền</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.length > 0 ? (
                        cartItems.map((item, index) => (
                          <tr key={index}>
                            <td data-label="Product">
                              <div className="shoppingBagTableImg">
                                <Link 
                                  to={`/Product/${item?.product?._id}`}
                                  onClick={scrollToTop}
                                >
                                  <img
                                    src={
                                      Array.isArray(item?.product?.image) &&
                                      item?.product?.image.length > 0
                                        ? item?.product?.image[0]
                                        : item?.product?.image
                                    }
                                    alt={item?.product?.title}
                                  />
                                </Link>
                              </div>
                            </td>
                            <td data-label="">
                              <div className="shoppingBagTableProductDetail">
                                <Link
                                  to={`/Product/${item?.product?._id}`}
                                  
                                >
                                  <ProductTitle title={item?.product?.title} />
                                </Link>
                              </div>
                            </td>
                            <td
                              data-label="Price"
                              style={{ textAlign: "center" }}
                            >
                              {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(
                                item?.product?.prices?.price
                                  ? item?.product?.prices?.price
                                  : item?.product?.prices?.originalPrice
                              )}
                            </td>
                            <td data-label="Quantity">
                             
                              <div className="productQuantity">
                                <button
                                  onClick={() =>
                                    handleQuantityChange(
                                      item?.product?._id,
                                      item.quantity - 1
                                    )
                                  }
                                >
                                  -
                                </button>
                                <input
                                  type="text"
                                  min="1"
                                  max="20"
                                  value={item.quantity}
                                  onChange={(e) =>
                                    handleQuantityChange(
                                      item?.product?._id,
                                      parseInt(e.target.value)
                                    )
                                  }
                                />
                                <button
                                  onClick={() =>
                                    handleQuantityChange(
                                      item?.product?._id,
                                      item.quantity + 1
                                    )
                                  }
                                >
                                  +
                                </button>
                              </div>
                            </td>
                            <td data-label="Subtotal">
                              <p
                                style={{
                                  textAlign: "center",
                                  fontWeight: "500",
                                }}
                              >
                                {new Intl.NumberFormat("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                }).format(
                                  (Number.parseInt(
                                    item?.product?.prices?.price
                                  ) ||
                                    Number.parseInt(
                                      item?.product?.prices?.originalPrice
                                    )) * item.quantity
                                )}
                              </p>
                            </td>
                            <td data-label="">
                              <MdOutlineClose
                                onClick={() =>
                                  dispatch(
                                    removeFromCart({
                                      itemId: item?._id,
                                    })
                                  )
                                }
                              />
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6">
                            <div className="shoppingCartEmpty">
                              <span>Giỏ hàng đang trống!</span>
                              <Link to="/shop" onClick={scrollToTop}>
                                <button>Mua ngay</button>
                              </Link>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>

                  {/* For Mobile devices */}

                  <div className="shoppingBagTableMobile">
                    {cartItems.length > 0 ? (
                      <>
                        {cartItems.map((item) => (
                          <div key={item.productID}>
                            <div className="shoppingBagTableMobileItems">
                              <div className="shoppingBagTableMobileItemsImg">
                                <Link to="/product" onClick={scrollToTop}>
                                  <img src={item.frontImg} alt="" />
                                </Link>
                              </div>
                              <div className="shoppingBagTableMobileItemsDetail">
                                <div className="shoppingBagTableMobileItemsDetailMain">
                                  <Link to="/product" onClick={scrollToTop}>
                                    <h4>{item.productName}</h4>
                                  </Link>
                                  <p>{item.productReviews}</p>
                                  <div className="shoppingBagTableMobileQuantity">
                                    {/* <button
                                      onClick={() =>
                                        handleQuantityChange(
                                          item.productID,
                                          item.quantity - 1
                                        )
                                      }
                                    >
                                      -
                                    </button>
                                    <input
                                      type="text"
                                      min="1"
                                      max="20"
                                      value={item.quantity}
                                      onChange={(e) =>
                                        handleQuantityChange(
                                          item.productID,
                                          parseInt(e.target.value)
                                        )
                                      }
                                    />
                                    <button
                                      onClick={() =>
                                        handleQuantityChange(
                                          item.productID,
                                          item.quantity + 1
                                        )
                                      }
                                    >
                                      +
                                    </button> */}
                                  </div>
                                  <span>${item.productPrice}</span>
                                </div>
                                <div className="shoppingBagTableMobileItemsDetailTotal">
                                  <MdOutlineClose
                                    size={20}
                                    onClick={() =>
                                      dispatch(removeFromCart(item.productID))
                                    }
                                  />
                                  <p>${item.quantity * item.productPrice}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        <div className="shopCartFooter">
                          <div className="shopCartFooterContainer">
                            <form>
                              <input
                                type="text"
                                placeholder="Coupon Code"
                              ></input>
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                }}
                              >
                                Áp dụng phiếu giảm giá
                              </button>
                            </form>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                              }}
                              className="shopCartFooterbutton"
                            >
                              Cập nhật giỏ hàng
                            </button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="shoppingCartEmpty">
                        <span>Giỏ hàng đang trống!</span>
                        <Link to="/shop" onClick={scrollToTop}>
                          <button>Mua ngay</button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
                <div className="shoppingBagTotal">
                  <h3>THANH TOÁN</h3>
                  <table className="shoppingBagTotalTable">
                    <tbody>
                      <tr>
                        <th>Tổng tiền</th>
                        <td>
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(totalPrice.toFixed(2))}{" "}
                        </td>
                      </tr>

                      <tr>
                        <th>Thành tiền</th>
                        <td>
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(
                            (totalPrice === 0 ? 0 : totalPrice).toFixed(2)
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <button
                    onClick={() => {
                      handleTabClick("cartTab2");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    disabled={cartItems.length === 0}
                  >
                    Thanh toán
                  </button>
                </div>
              </div>
            )}

            {/* tab2 */}
            {activeTab === "cartTab2" && (
              <form onSubmit={handleSubmitOrder}>
                <div className="checkoutSection">
                  <div className="checkoutDetailsSection">
                    <h4>Thông tin đặt hàng</h4>
                    <div className="checkoutDetailsForm">
                      <div className="form">
                        {/* <div className="checkoutDetailsFormRow"> */}
                          <input
                            type="text"
                            name="firstName"
                            placeholder="Nhập tên ..."
                            value={formData.firstName}
                            onChange={handleInputChange}
                          />
                          {formErrors.firstName && (
                            <p className="error">{formErrors.firstName}</p>
                          )}
                          {/* <input
                            type="text"
                            name="lastName"
                            placeholder="Nhập họ ..."
                            value={formData.lastName}
                            onChange={handleInputChange}
                          />
                          {formErrors.lastName && (
                            <p className="error">{formErrors.lastName}</p>
                          )} */}
                        {/* </div> */}

                        <input
                          type="text"
                          name="address"
                          placeholder="Nhập địa chỉ ..."
                          value={formData.address}
                          onChange={handleInputChange}
                        />
                        {formErrors.address && (
                          <p className="error">{formErrors.address}</p>
                        )}
                        {/* <input
                          type="text"
                          name="city"
                          placeholder="Nhập thành phố / thị trấn ..."
                          value={formData.city}
                          onChange={handleInputChange}
                        />
                        {formErrors.city && (
                          <p className="error">{formErrors.city}</p>
                        )}
                        <input
                          type="text"
                          name="postcode"
                          placeholder="Postcode / ZIP *"
                          value={formData.postcode}
                          onChange={handleInputChange}
                        />
                        {formErrors.postcode && (
                          <p className="error">{formErrors.postcode}</p>
                        )} */}
                        <input
                          type="text"
                          name="contact"
                          placeholder="Nhập số điện thoại ..."
                          value={formData.contact}
                          onChange={handleInputChange}
                        />
                        {formErrors.contact && (
                          <p className="error">{formErrors.contact}</p>
                        )}
                        {/* <input
                          type="mail"
                          name="email"
                          placeholder="Nhập email ..."
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                        {formErrors.email && (
                          <p className="error">{formErrors.email}</p>
                        )} */}
                        <textarea
                          cols={30}
                          rows={8}
                          name="orderNotes"
                          placeholder="Ghi chú đặt hàng (Tùy chọn)"
                          value={formData.orderNotes}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="checkoutPaymentSection">
                    <div className="checkoutTotalContainer">
                      <h3>Đơn hàng của bạn</h3>
                      <div className="checkoutItems">
                        <table>
                          <thead>
                            <tr>
                              <th>Sản phẩm</th>
                              <th>Tổng tiền</th>
                            </tr>
                          </thead>
                          <tbody>
                            {cartItems.map((items) => (
                              <tr>
                                <td>
                                  {items?.product?.title} x {items.quantity}
                                </td>
                                <td>
                                  {items.product.prices.price ||
                                    items.product.prices.originalPrice *
                                      items.quantity}{" "}
                                  đ
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="checkoutTotal">
                        <table>
                          <tbody>
                            <tr>
                              <th>Tổng tiền</th>
                              <td>
                                {new Intl.NumberFormat("vi-VN").format(
                                  totalPrice
                                )}{" "}
                                đ
                              </td>
                            </tr>

                            <tr>
                              <th>Thành tiền</th>
                              <td>
                                {totalPrice === 0
                                  ? 0
                                  : new Intl.NumberFormat("vi-VN").format(
                                      totalPrice
                                    )}{" "}
                                đ
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="checkoutPaymentContainer">
                      <label>
                        <input
                          type="radio"
                          name="payment"
                          value="cod"
                          defaultChecked
                          onChange={handlePaymentChange}
                        />
                        <div className="checkoutPaymentMethod">
                          <span>Thanh toán bằng tiền mặt khi nhận hàng</span>
                          <p>
                            Bạn có thể thanh toán trực tiếp cho người giao hàng
                            khi nhận sản phẩm. Đây là phương thức thanh toán
                            tiện lợi và dễ dàng, giúp bạn kiểm tra sản phẩm
                            trước khi thanh toán.
                          </p>
                        </div>
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="payment"
                          value="momo"
                          onChange={handlePaymentChange}
                        />
                        <div className="checkoutPaymentMethod">
                          <span>Thanh toán qua Momo</span>
                          <p>
                            Thanh toán qua ví điện tử Momo là phương thức nhanh
                            chóng và an toàn. Bạn chỉ cần sử dụng điện thoại di
                            động để thanh toán mà không cần phải trực tiếp sử
                            dụng tiền mặt.
                          </p>
                        </div>
                      </label>
                      <div className="policyText">
                        Dữ liệu cá nhân của bạn sẽ được sử dụng để xử lý đơn đặt
                        hàng của bạn, hỗ trợ trải nghiệm của bạn trên toàn bộ
                        trang web này và cho các mục đích khác được mô tả trong{" "}
                        <Link to="/terms" onClick={scrollToTop}>
                          Chính sách bảo mật
                        </Link>
                        .
                      </div>
                    </div>
                    <button type="submit">Đặt hàng</button>
                  </div>
                </div>
              </form>
            )}

            {/* tab3 */}
            {activeTab === "cartTab3" && (
              <div className="orderCompleteSection">
                <div className="orderComplete">
                  <div className="orderCompleteMessage">
                    <div className="orderCompleteMessageImg">
                      <img src={success} alt="" />
                    </div>
                    <h4>Đơn hàng của bạn đã được xác nhận !</h4>
                    <p>Cảm ơn bạn đã đặt đơn hàng thành công !</p>
                  </div>
                  <div className="orderInfo">
                    <div className="orderInfoItem">
                      <p>Mã đặt hàng</p>
                      <h4>{orderNumber}</h4>
                    </div>
                    <div className="orderInfoItem">
                      <p>Thời gian</p>
                      <h4>{formatDate(currentDate)}</h4>
                    </div>
                    <div className="orderInfoItem">
                      <p>Tổng tiền</p>
                      <h4>
                        {totalPrice !== 0
                          ? new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                              minimumFractionDigits: 2, // Đảm bảo luôn có 2 chữ số sau dấu thập phân
                              maximumFractionDigits: 2, // Số chữ số sau dấu thập phân tối đa là 2
                            }).format(totalPrice)
                          : "0 ₫"}
                      </h4>
                    </div>
                    <div className="orderInfoItem">
                      <p>Phương thức thanh toán</p>
                      <h4>{selectedPayment}</h4>
                    </div>
                  </div>
                  <div className="orderTotalContainer">
                    <h3>Chi tiết đặt hàng</h3>
                    <div className="orderItems">
                      <table>
                        <thead>
                          <tr>
                            <th>Sản phẩm</th>
                            <th>Giá</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartItems.map((items) => (
                            <tr>
                              <td>
                                {items?.product?.title} x {items.quantity}
                              </td>
                              <td>
                                {new Intl.NumberFormat("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                }).format(
                                  items.product.prices.price ||
                                    items.product.prices.originalPrice *
                                      items.quantity
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="orderTotal">
                      <table>
                        <tbody>
                          <tr>
                            <th>Tổng tiền</th>
                            <td>
                              <span>
                                {new Intl.NumberFormat("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                }).format(totalPrice || 0)}
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <th>Thành tiền</th>
                            <td>
                              {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(totalPrice || 0)}
                            </td>
                          </tr>
                          <tr>
                            <td style={{color: "red"}}>Nếu muốn hủy đơn hàng hãy liên hệ Admin</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
