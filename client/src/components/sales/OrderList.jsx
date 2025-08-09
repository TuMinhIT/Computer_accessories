import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import OrderDetail from "./OrderDetail";

// Dữ liệu tĩnh minh họa
const initialOrders = [
  {
    id: 1,
    createdAt: new Date("2025-08-08"),
    total: 1500,
    items: [{ productName: "Laptop Dell", quantity: 1, price: 1500 }],
  },
  {
    id: 2,
    createdAt: new Date("2025-08-07"),
    total: 200,
    items: [{ productName: "Chuột Gaming", quantity: 2, price: 100 }],
  },
  {
    id: 3,
    createdAt: new Date("2025-08-06"),
    total: 300,
    items: [{ productName: "Tai nghe Sony", quantity: 1, price: 300 }],
  },
];

const OrderList = ({ selectedPeriod }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const filteredOrders = initialOrders.filter(
    (order) =>
      (selectedPeriod === "today" &&
        order.createdAt.toDateString() === new Date().toDateString()) ||
      (selectedPeriod === "yesterday" &&
        order.createdAt.toDateString() ===
          new Date(Date.now() - 86400000).toDateString()) ||
      selectedPeriod === "last7days" ||
      (selectedPeriod === "thismonth" &&
        order.createdAt.getMonth() === new Date().getMonth())
  );

  return (
    <motion.div variants={containerVariants} className="mb-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 border-b-2 border-purple-200 pb-2">
        Danh Sách Đơn Hàng
      </h2>
      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-base">
          <thead>
            <tr className="bg-gradient-to-r from-indigo-100 to-purple-100">
              <th className="p-4 text-left text-gray-700 font-medium">Ngày</th>
              <th className="p-4 text-left text-gray-700 font-medium">
                Tổng tiền
              </th>
              <th className="p-4 text-left text-gray-700 font-medium">
                Xem chi tiết
              </th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {filteredOrders.map((order) => (
                <motion.tr
                  key={order.id}
                  variants={childVariants}
                  whileHover={{
                    backgroundColor: "rgba(244, 244, 245, 0.8)",
                    transition: { duration: 0.2 },
                  }}
                  className="border-b border-gray-200"
                >
                  <td className="p-4">
                    {order.createdAt.toLocaleDateString()}
                  </td>
                  <td className="p-4 font-medium text-indigo-700">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="p-4">
                    <motion.button
                      variants={childVariants}
                      whileHover={{ scale: 1.1, color: "#6b21a8" }}
                      whileTap={{ scale: 0.98 }}
                      className="text-indigo-600 underline"
                      onClick={() => setSelectedOrder(order)}
                    >
                      Xem
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
      {selectedOrder && (
        <OrderDetail
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </motion.div>
  );
};

export default OrderList;
