import { useState } from 'react';
import axios from 'axios';

export default function ViewCustomer() {
    const [phone, setPhone] = useState('');
    const [customerInfo, setCustomerInfo] = useState(null);
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('');

    const fetchCustomerData = async () => {
        try {
            const res = await axios.get(`/api/customers/${phone}`);
            setCustomerInfo(res.data.customer);
            setOrders(res.data.orders);
            setError('');
        } catch (err) {
            setError('Không tìm thấy khách hàng');
            setCustomerInfo(null);
            setOrders([]);
        }
    };

    return (
        <div>
            <h2>Xem thông tin khách hàng</h2>
            <input
                type="text"
                placeholder="Nhập số điện thoại"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            <button onClick={fetchCustomerData}>Tìm kiếm</button>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {customerInfo && (
                <div>
                    <h3>Thông tin khách hàng</h3>
                    <p><strong>Tên:</strong> {customerInfo.name}</p>
                    <p><strong>Địa chỉ:</strong> {customerInfo.address}</p>
                    <p><strong>Lương:</strong> {customerInfo.salary}</p>

                    <h3>Lịch sử đơn hàng</h3>
                    {orders.length === 0 ? (
                        <p>Chưa có đơn hàng nào</p>
                    ) : (
                        <ul>
                            {orders.map((order, index) => (
                                <li key={index}>
                                    <p><strong>Ngày:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                                    <p><strong>Tổng tiền:</strong> {order.totalAmount} VND</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}
