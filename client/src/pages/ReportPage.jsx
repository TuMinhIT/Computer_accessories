import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PeriodFilter from '../components/PeriodFilter';
import SummaryStats from '../components/SummaryStats';
import OrderList from '../components/OrderList';

const ReportPage = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('today');
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.1 },
        },
    };

    const childVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
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
                    Báo Cáo và Phân Tích
                </motion.h1>

                <motion.div
                    variants={childVariants}
                    className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-gray-200/50"
                >
                    <PeriodFilter selectedPeriod={selectedPeriod} setSelectedPeriod={setSelectedPeriod} />
                    <SummaryStats selectedPeriod={selectedPeriod} />
                    <OrderList selectedPeriod={selectedPeriod} />
                </motion.div>
            </motion.div>
        </div>
    );
};

export default ReportPage;