import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const PosPage = () => {
    const [phone, setPhone] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [isNewCustomer, setIsNewCustomer] = useState(false);
    const [customerId, setCustomerId] = useState(null);
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const handlePhoneChange = async (e) => {
        const input = e.target.value;
        setPhone(input);

        if (input.length >= 10) {
            try {
                const res = await axios.get(`http://localhost:5000/api/customers/find?phone=${input}`);
                if (res.data) {
                    setName(res.data.name);
                    setAddress(res.data.address);
                    setCustomerId(res.data._id);
                    setIsNewCustomer(false);
                    fetchCustomerOrders(res.data._id);
                } else {
                    setName("");
                    setAddress("");
                    setIsNewCustomer(true);
                    setOrders([]);
                }
            } catch (err) {
                console.log("Không tìm thấy khách, tạo mới");
                setName("");
                setAddress("");
                setIsNewCustomer(true);
                setOrders([]);
            }
        }
    };

    const fetchCustomerOrders = async (id) => {
        try {
            const res = await axios.get(`http://localhost:5000/api/customers/${id}/orders`);
            setOrders(res.data);
        } catch (err) {
            console.error("Lỗi khi lấy lịch sử đơn hàng", err);
        }
    };

    const handleCheckout = async () => {
        if (!phone || !name || !address) return alert("Vui lòng nhập đầy đủ thông tin");

        try {
            const res = await axios.post("http://localhost:5000/api/customers/find-or-create", {
                phone,
                fullName: name,
                address,
            });

            alert("Thanh toán thành công!");
            setPhone("");
            setName("");
            setAddress("");
            setOrders([]);
            setCustomerId(null);
        } catch (err) {
            console.error(err);
            alert("Có lỗi xảy ra khi thanh toán");
        }
    };

    const handleViewDetails = async (orderId) => {
        try {
            const res = await axios.get(`http://localhost:5000/api/orders/${orderId}`);
            setSelectedOrder(res.data);
        } catch (err) {
            console.error("Không lấy được chi tiết đơn hàng", err);
        }
    };

    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    const tableRowVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } },
    };

    const orderDetailVariants = {
        hidden: { opacity: 0, height: 0 },
        visible: { opacity: 1, height: "auto", transition: { duration: 0.4 } },
        exit: { opacity: 0, height: 0, transition: { duration: 0.3 } },
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                className="max-w-7xl mx-auto"
            >
                <motion.h1
                    variants={fadeInUp}
                    className="text-3xl font-extrabold text-indigo-900 mb-6 text-center shadow-text"
                >
                    Bán Hàng POS
                </motion.h1>

                {/* Input Section */}
                <motion.div
                    variants={fadeInUp}
                    className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-200"
                >
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                        <motion.div variants={fadeInUp}>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
                            <input
                                type="text"
                                value={phone}
                                onChange={handlePhoneChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 placeholder-gray-400"
                                placeholder="Nhập số điện thoại"
                            />
                        </motion.div>
                        <motion.div variants={fadeInUp}>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Họ tên</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 bg-gray-50 disabled:bg-gray-100"
                                placeholder="Họ tên"
                                disabled={!isNewCustomer}
                            />
                        </motion.div>
                        <motion.div variants={fadeInUp}>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Địa chỉ</label>
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 bg-gray-50 disabled:bg-gray-100"
                                placeholder="Địa chỉ"
                                disabled={!isNewCustomer}
                            />
                        </motion.div>
                        <motion.div variants={fadeInUp}>
                            <button
                                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                                onClick={handleCheckout}
                            >
                                Thanh toán
                            </button>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Order History Section */}
                {orders.length > 0 && (
                    <motion.div
                        variants={fadeInUp}
                        className="mt-8 bg-white rounded-2xl shadow-2xl p-6 border border-gray-200"
                    >
                        <motion.h2
                            variants={fadeInUp}
                            className="text-2xl font-bold text-gray-800 mb-4"
                        >
                            Lịch sử mua hàng
                        </motion.h2>
                        <motion.div variants={fadeInUp}>
                            <table className="w-full border-collapse text-sm">
                                <thead>
                                    <tr className="bg-gradient-to-r from-indigo-100 to-gray-100">
                                        <th className="border-b-2 border-gray-200 px-4 py-3 text-left text-gray-700 font-semibold">Ngày</th>
                                        <th className="border-b-2 border-gray-200 px-4 py-3 text-left text-gray-700 font-semibold">Tổng tiền</th>
                                        <th className="border-b-2 border-gray-200 px-4 py-3 text-left text-gray-700 font-semibold">Đã trả</th>
                                        <th className="border-b-2 border-gray-200 px-4 py-3 text-left text-gray-700 font-semibold">Trả thừa</th>
                                        <th className="border-b-2 border-gray-200 px-4 py-3 text-left text-gray-700 font-semibold">Số lượng SP</th>
                                        <th className="border-b-2 border-gray-200 px-4 py-3 text-left text-gray-700 font-semibold">Xem</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <AnimatePresence>
                                        {orders.map((order) => (
                                            <motion.tr
                                                key={order._id}
                                                variants={tableRowVariants}
                                                initial="hidden"
                                                animate="visible"
                                                exit="hidden"
                                                className="hover:bg-gray-50 transition duration-200"
                                            >
                                                <td className="border-b border-gray-200 px-4 py-3">{new Date(order.createdAt).toLocaleDateString()}</td>
                                                <td className="border-b border-gray-200 px-4 py-3">{order.totalAmount}</td>
                                                <td className="border-b border-gray-200 px-4 py-3">{order.paidAmount}</td>
                                                <td className="border-b border-gray-200 px-4 py-3">{order.overpaidAmount || 0}</td>
                                                <td className="border-b border-gray-200 px-4 py-3">{order.totalItems}</td>
                                                <td className="border-b border-gray-200 px-4 py-3">
                                                    <button
                                                        className="text-indigo-600 hover:text-indigo-800 underline transition duration-200"
                                                        onClick={() => handleViewDetails(order._id)}
                                                    >
                                                        Xem
                                                    </button>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                </tbody>
                            </table>
                        </motion.div>
                    </motion.div>
                )}

                {/* Order Details Section */}
                <AnimatePresence>
                    {selectedOrder && (
                        <motion.div
                            variants={orderDetailVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="mt-6 bg-white rounded-2xl shadow-2xl p-6 border border-gray-200"
                        >
                            <motion.h3
                                variants={fadeInUp}
                                className="text-xl font-semibold text-gray-800 mb-4"
                            >
                                Chi tiết đơn hàng
                            </motion.h3>
                            <motion.ul
                                variants={fadeInUp}
                                className="list-disc ml-6 text-gray-700"
                            >
                                {selectedOrder.items.map((item, idx) => (
                                    <motion.li
                                        key={idx}
                                        variants={fadeInUp}
                                        className="mb-2"
                                    >
                                        {item.productName} - {item.quantity} x {item.price} = {item.quantity * item.price}
                                    </motion.li>
                                ))}
                            </motion.ul>
                            <motion.p
                                variants={fadeInUp}
                                className="mt-4 text-lg font-bold text-indigo-900"
                            >
                                Tổng tiền: {selectedOrder.totalAmount}
                            </motion.p>
                            <motion.button
                                variants={fadeInUp}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
                                onClick={() => setSelectedOrder(null)}
                            >
                                Đóng
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default PosPage;