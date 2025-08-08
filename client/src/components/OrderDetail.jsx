import React from 'react';
import { motion } from 'framer-motion';

const OrderDetail = ({ order, onClose }) => {
    const containerVariants = {
        hidden: { opacity: 0, height: 0 },
        visible: { opacity: 1, height: 'auto', transition: { duration: 0.5, ease: 'easeOut' } },
        exit: { opacity: 0, height: 0, transition: { duration: 0.3 } },
    };

    const childVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="mt-6 p-6 bg-white/90 backdrop-blur-md rounded-2xl border border-purple-200 shadow-xl"
        >
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-indigo-200 pb-2">
                Chi Tiết Đơn Hàng
            </h3>
            <motion.ul
                variants={containerVariants}
                className="list-disc ml-6 text-gray-700"
            >
                {order.items.map((item, i) => (
                    <motion.li
                        key={i}
                        variants={childVariants}
                        className="mb-3 text-lg"
                    >
                        {item.productName} - SL: {item.quantity} - Giá: ${item.price.toFixed(2)}
                    </motion.li>
                ))}
            </motion.ul>
            <motion.p
                variants={childVariants}
                className="mt-4 text-xl font-bold text-indigo-900"
            >
                Tổng tiền: ${order.total.toFixed(2)}
            </motion.p>
            <motion.button
                variants={childVariants}
                whileHover={{ scale: 1.1, boxShadow: '0 5px 15px rgba(239, 68, 68, 0.3)' }}
                whileTap={{ scale: 0.98 }}
                className="mt-6 bg-gradient-to-r from-red-500 to-rose-600 text-white px-6 py-3 rounded-xl hover:from-red-600 hover:to-rose-700 transition-all duration-300"
                onClick={onClose}
            >
                Đóng
            </motion.button>
        </motion.div>
    );
};

export default OrderDetail;