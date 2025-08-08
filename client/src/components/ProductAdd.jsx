import React from 'react';
import { motion } from 'framer-motion';

const ProductAdd = ({ products }) => {
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
            className="mb-10"
        >
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 border-b-2 border-indigo-200 pb-2">
                Danh Sách Sản Phẩm
            </h2>
            <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full text-base">
                    <thead>
                        <tr className="bg-gradient-to-r from-indigo-100 to-purple-100">
                            <th className="p-4 text-left text-gray-700 font-medium">Tên sản phẩm</th>
                            <th className="p-4 text-left text-gray-700 font-medium">Mã vạch</th>
                            <th className="p-4 text-left text-gray-700 font-medium">Số lượng</th>
                            <th className="p-4 text-left text-gray-700 font-medium">Đơn giá</th>
                            <th className="p-4 text-left text-gray-700 font-medium">Tổng tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <motion.tr
                                key={product.id}
                                variants={childVariants}
                                whileHover={{ backgroundColor: 'rgba(244, 244, 245, 0.8)', transition: { duration: 0.2 } }}
                                className="border-b border-gray-200"
                            >
                                <td className="p-4">{product.name}</td>
                                <td className="p-4">{product.barcode}</td>
                                <td className="p-4">{product.quantity}</td>
                                <td className="p-4">${product.price.toFixed(2)}</td>
                                <td className="p-4 font-medium text-indigo-700">${product.total.toFixed(2)}</td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
};

export default ProductAdd;