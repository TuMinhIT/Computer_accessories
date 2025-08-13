import React from "react";
import { motion } from "framer-motion";

const CustomerInfo = () => {
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
  const customer = {
    phone: "0901234567",
    fullName: "Nguyen Van A",
    address: "123 Le Loi, Quan 1, TP.HCM",
  };

  return (
    <motion.div variants={containerVariants} className="mb-10">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 border-b-2 border-purple-200 pb-2">
        Thông Tin Khách Hàng
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Số điện thoại", value: customer.phone },
          { label: "Họ tên", value: customer.fullName },
          { label: "Địa chỉ", value: customer.address },
        ].map((field, index) => (
          <motion.div
            key={index}
            variants={childVariants}
            className="bg-gray-50/80 backdrop-blur-sm p-4 rounded-xl border border-gray-200 shadow-inner"
          >
            <label className="block text-sm font-medium text-gray-600 mb-2">
              {field.label}
            </label>
            <input
              type="text"
              value={field.value}
              readOnly
              className="w-full px-4 py-2 bg-white/90 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default CustomerInfo;
