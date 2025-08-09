import React from 'react';
import { motion } from 'framer-motion';

const ReceiptPreview = ({ total, paid, change }) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    const childVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
    };

    return (
        <motion.div
            variants={containerVariants}
            className="mt-10"
        >
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 border-b-2 border-indigo-200 pb-2">
                Xem Trước Hóa Đơn
            </h2>
            <div className="bg-gradient-to-br from-green-50 to-gray-50 p-6 rounded-2xl border border-green-200/50 shadow-lg">
                <motion.p variants={childVariants} className="text-lg text-gray-700">
                    Tổng tiền: <span className="font-bold text-indigo-700">${total.toFixed(2)}</span>
                </motion.p>
                <motion.p variants={childVariants} className="text-lg text-gray-700">
                    Tiền khách trả: <span className="font-bold text-indigo-700">${paid.toFixed(2)}</span>
                </motion.p>
                <motion.p variants={childVariants} className="text-lg text-gray-700">
                    Tiền thừa: <span className="font-bold text-green-600">${change.toFixed(2)}</span>
                </motion.p>
                <motion.button
                    variants={childVariants}
                    whileHover={{ scale: 1.1, boxShadow: '0 10px 20px rgba(0, 128, 0, 0.3)' }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-6 w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300"
                >
                    In Hóa Đơn
                </motion.button>
            </div>
        </motion.div>
    );
};

export default ReceiptPreview;