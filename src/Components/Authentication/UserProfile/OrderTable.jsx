import React, { useEffect, useState } from "react";
import "./OrderTable.css";

const OrderTable = () => {
    const storedUser = JSON.parse(localStorage.getItem("user")); // Lấy thông tin user từ localStorage
    const [userInfo] = useState(storedUser || {}); // Tránh thay đổi trực tiếp userInfo

    const [orders, setOrders] = useState([]); // State lưu danh sách đơn hàng
    const [loading, setLoading] = useState(true); // State loading
    const [currentPage, setCurrentPage] = useState(1); // Trạng thái trang hiện tại
    const [resultsPerPage] = useState(5); // Số lượng đơn hàng hiển thị trên một trang

    useEffect(() => {
        const fetchOrders = async () => {
            if (!userInfo._id) {
                console.error("Không tìm thấy ID khách hàng!");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`http://localhost:3002/orders/customer/${userInfo._id}`);
                if (!response.ok) {
                    throw new Error("Lỗi khi lấy dữ liệu đơn hàng");
                }
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu đơn hàng:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [userInfo._id]);

    // Xử lý phân trang: Tính toán các đơn hàng cần hiển thị trên trang hiện tại
    const totalResults = orders.length;
    const indexOfLastOrder = currentPage * resultsPerPage;
    const indexOfFirstOrder = indexOfLastOrder - resultsPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    // Hàm chuyển trang
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (loading) {
        return <p>Đang tải dữ liệu...</p>;
    }

    if (!orders.length) {
        return <p>Không có đơn hàng nào.</p>;
    }
    return (
        <div className="order-container">
            <h3 className="order-title">Danh sách đặt hàng của khách hàng</h3>
            <table className="order-table">
                <thead>
                    <tr>
                        <th>Mã đơn hàng</th>
                        <th>Thời gian</th>
                        <th>Địa chỉ</th>
                        <th>Số điện thoại</th>
                        <th>Sản phẩm</th>
                        <th>Thanh toán</th>
                        <th>Tổng tiền</th>
                        <th>Trạng thái đơn hàng</th>
                    </tr>
                </thead>
                <tbody>
                    {currentOrders.map((order) => (
                        <tr key={order.invoice}>
                            <td>{order.invoice}</td>
                            <td>{new Date(order.createdAt).toLocaleString()}</td>
                            <td>{order.user_info.address}</td>
                            <td>{order.user_info.contact}</td>
                            <td>
                            {order.cart.map((item, index) => (
                                <div key={index}>{item.id?.title} - Số lượng: {item.quantity}</div>
                                
                            ))}
                            </td>
                    
                            <td>{order.paymentStatus ? "Đã thanh toán" : "Chưa thanh toán"}</td>
                            <td>{order.total.toLocaleString()} VND</td>
                            <td>{order.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Thêm phân trang ở dưới bảng */}
            <div className="pagination">
                <button 
                    onClick={() => handlePageChange(currentPage - 1)} 
                    disabled={currentPage === 1}
                >
                    Prev
                </button>
                <span>Page {currentPage} of {Math.ceil(totalResults / resultsPerPage)}</span>
                <button 
                    onClick={() => handlePageChange(currentPage + 1)} 
                    disabled={currentPage === Math.ceil(totalResults / resultsPerPage)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default OrderTable;
