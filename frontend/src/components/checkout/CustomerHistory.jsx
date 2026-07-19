import React, { useEffect, useState } from "react";
import { getCustomerOrders } from "../../api/customerApi";
import { motion, AnimatePresence } from "framer-motion";

const CustomerHistory = ({ customerId }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getCustomerOrders(customerId).then(setOrders);
  }, [customerId]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const orderItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-2xl border border-gray-200">
      <motion.h3
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="text-2xl font-bold text-indigo-900 mb-6 text-center"
      >
        Lịch sử mua hàng
      </motion.h3>

      <AnimatePresence>
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <motion.div
              key={index}
              variants={orderItemVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-gray-100 transition duration-200"
            >
              <motion.p
                variants={orderItemVariants}
                className="text-gray-700 font-medium"
              >
                Ngày mua: {new Date(order.createdAt).toLocaleDateString()}
              </motion.p>
              <motion.p variants={orderItemVariants} className="text-gray-700">
                Tổng tiền: {order.total}
              </motion.p>
              <motion.p variants={orderItemVariants} className="text-gray-700">
                Khách trả: {order.paid}
              </motion.p>
              <motion.p variants={orderItemVariants} className="text-gray-700">
                Tiền thừa: {order.change}
              </motion.p>
              <motion.p
                variants={orderItemVariants}
                className="text-gray-700 font-medium mt-2"
              >
                Sản phẩm:
              </motion.p>
              <motion.ul
                variants={orderItemVariants}
                className="list-disc ml-6 text-gray-600"
              >
                {order.items.map((item, i) => (
                  <motion.li
                    key={i}
                    variants={orderItemVariants}
                    className="mt-1"
                  >
                    {item.productName} - SL: {item.quantity} - Giá: {item.price}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          ))
        ) : (
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-center text-gray-500 text-lg mt-4"
          >
            Không có lịch sử mua hàng.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomerHistory;
