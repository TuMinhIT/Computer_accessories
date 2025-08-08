import React, { useState } from 'react';
import CheckoutCustomerForm from '../components/CheckoutCustomerForm';
import { motion, AnimatePresence } from 'framer-motion';

const CheckoutPage = () => {
    const [customer, setCustomer] = useState(null);

    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    const customerDetailVariants = {
        hidden: { opacity: 0, height: 0 },
        visible: { opacity: 1, height: 'auto', transition: { duration: 0.4 } },
        exit: { opacity: 0, height: 0, transition: { duration: 0.3 } },
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                className="max-w-4xl mx-auto"
            >
                <motion.h2
                    variants={fadeInUp}
                    className="text-3xl font-extrabold text-indigo-900 mb-8 text-center shadow-text"
                >
                    Thanh toán
                </motion.h2>

                {/* Checkout Customer Form */}
                <motion.div
                    variants={fadeInUp}
                    className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-200"
                >
                    <CheckoutCustomerForm onCustomerFound={setCustomer} />
                </motion.div>

                {/* Customer Details */}
                <AnimatePresence>
                    {customer && (
                        <motion.div
                            variants={customerDetailVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="mt-6 bg-white rounded-2xl shadow-2xl p-6 border border-gray-200"
                        >
                            <motion.h3
                                variants={fadeInUp}
                                className="text-xl font-semibold text-gray-800 mb-4"
                            >
                                Thông tin khách hàng
                            </motion.h3>
                            <motion.div
                                variants={fadeInUp}
                                className="space-y-3 text-gray-700"
                            >
                                <p className="flex items-center">
                                    <span className="font-medium text-indigo-600 mr-2">Khách hàng:</span>
                                    {customer.fullName}
                                </p>
                                <p className="flex items-center">
                                    <span className="font-medium text-indigo-600 mr-2">SĐT:</span>
                                    {customer.phone}
                                </p>
                                <p className="flex items-center">
                                    <span className="font-medium text-indigo-600 mr-2">Địa chỉ:</span>
                                    {customer.address}
                                </p>
                            </motion.div>
                            <motion.button
                                variants={fadeInUp}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="mt-6 bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600 transition duration-200 shadow-lg"
                                onClick={() => setCustomer(null)}
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

export default CheckoutPage;