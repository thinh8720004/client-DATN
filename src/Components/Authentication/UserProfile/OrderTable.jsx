import React, { useEffect, useState } from "react";
import "./OrderTable.css";

const OrderTable = () => {
    const storedUser = JSON.parse(localStorage.getItem("user")); // Lấy thông tin user từ localStorage
    const [userInfo] = useState(storedUser || {}); // Tránh thay đổi trực tiếp userInfo

    const [orders, setOrders] = useState([]); // State lưu danh sách đơn hàng
    const [loading, setLoading] = useState(true); // State loading

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

    console.log(orders)

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
                        <th>Thanh toán</th>
                        <th>Tổng tiền</th>
                        <th>Trạng thái đơn hàng</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.invoice}>
                            <td>{order.invoice}</td>
                            <td>{new Date(order.createdAt).toLocaleString()}</td>
                            <td>{order.user_info.address}</td>
                            <td>{order.user_info.contact}</td>
                            <td>{order.paymentStatus ? "Đã thanh toán" : "Chưa thanh toán"}</td>
                            <td>{order.total.toLocaleString()} VND</td>
                            <td>{order.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderTable;
