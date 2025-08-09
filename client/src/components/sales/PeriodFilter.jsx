import React from 'react';
import { motion } from 'framer-motion';

const PeriodFilter = ({ selectedPeriod, setSelectedPeriod }) => {
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
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 border-b-2 border-purple-200 pb-2">
                Chọn Mốc Thời Gian
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {['today', 'yesterday', 'last7days', 'thismonth', 'custom'].map((period) => (
                    <motion.button
                        key={period}
                        variants={childVariants}
                        whileHover={{ scale: 1.1, boxShadow: '0 5px 15px rgba(99, 102, 241, 0.3)' }}
                        whileTap={{ scale: 0.98 }}
                        className={`px-6 py-3 rounded-xl transition-all duration-300 ${selectedPeriod === period
                                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        onClick={() => setSelectedPeriod(period)}
                    >
                        {period === 'today' && 'Hôm nay'}
                        {period === 'yesterday' && 'Hôm qua'}
                        {period === 'last7days' && '7 ngày qua'}
                        {period === 'thismonth' && 'Tháng này'}
                        {period === 'custom' && 'Tùy chọn'}
                    </motion.button>
                ))}
            </div>
        </motion.div>
    );
};

export default PeriodFilter;