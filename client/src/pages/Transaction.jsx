import React from "react";
import { motion } from "framer-motion";
import CustomerInfo from "../components/checkout/CustomerInfo";
import ReceiptPreview from "../components/checkout/ReceiptPreview";

const initialProducts = [
  {
    id: 1,
    name: "Laptop Dell XPS 13",
    barcode: "LAP001",
    quantity: 1,
    price: 1500,
    total: 1500,
  },
  {
    id: 2,
    name: "Chuột Gaming Razer",
    barcode: "MOU002",
    quantity: 2,
    price: 50,
    total: 100,
  },
  {
    id: 3,
    name: "Tai nghe Sony WH-1000XM4",
    barcode: "EAR003",
    quantity: 1,
    price: 300,
    total: 300,
  },
];

const Transaction = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-gray-100 p-6 overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto relative"
      >
        <motion.h1
          variants={childVariants}
          className="text-5xl font-extrabold text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text mb-12 text-center drop-shadow-lg"
        >
          Hệ Thống Xử Lý Giao Dịch POS
        </motion.h1>

        <motion.div
          variants={childVariants}
          className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-gray-200/50"
        >
          <ProductAdd products={initialProducts} />
          <CustomerInfo />
          <ReceiptPreview total={1900} paid={2000} change={100} />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Transaction;
