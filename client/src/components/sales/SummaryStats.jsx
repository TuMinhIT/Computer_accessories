import React from "react";
import { motion } from "framer-motion";

const SummaryStats = ({ selectedPeriod }) => {
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

  // Dữ liệu tĩnh minh họa
  const stats = {
    totalRevenue: 5000,
    orderCount: 10,
    productCount: 25,
    profit: 1500, // Chỉ admin thấy
  };

  return (
    <motion.div variants={containerVariants} className="mb-10">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 border-b-2 border-indigo-200 pb-2">
        Thống kê ({selectedPeriod === "today" ? "Hôm nay" : selectedPeriod})
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            label: "Tổng tiền",
            value: `$${stats.totalRevenue.toFixed(2)}`,
            color: "indigo-700",
          },
          {
            label: "Số đơn hàng",
            value: stats.orderCount,
            color: "indigo-700",
          },
          {
            label: "Số sản phẩm",
            value: stats.productCount,
            color: "indigo-700",
          },
          {
            label: "Lợi nhuận",
            value: `$${stats.profit.toFixed(2)}`,
            color: "green-600",
          },
        ].map((stat, index) => (
          <motion.div
            key={index}
            variants={childVariants}
            className="bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <p className="text-sm font-medium text-gray-600">{stat.label}</p>
            <p className={`text-3xl font-bold text-${stat.color}`}>
              {stat.value}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SummaryStats;
