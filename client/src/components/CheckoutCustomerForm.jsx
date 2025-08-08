import React, { useState } from 'react';
import { findOrCreateCustomer } from '../api/customerApi';

const CheckoutCustomerForm = ({ onCustomerFound }) => {
    const [phone, setPhone] = useState('');
    const [fullName, setFullName] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');

    const handleFindOrCreate = async () => {
        try {
            const data = await findOrCreateCustomer({ phone, fullName, address });
            onCustomerFound(data);
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'Lỗi hệ thống');
        }
    };

    return (
        <div className="bg-white p-6 rounded shadow-md max-w-xl mx-auto">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Thông tin khách hàng</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Số điện thoại</label>
                    <input
                        placeholder="SĐT"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Họ tên</label>
                    <input
                        placeholder="Họ tên"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Địa chỉ</label>
                    <input
                        placeholder="Địa chỉ"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            <button
                onClick={handleFindOrCreate}
                className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
            >
                Tìm / Tạo khách hàng
            </button>

            {error && (
                <p className="mt-4 text-red-600 text-sm font-medium">{error}</p>
            )}
        </div>
    );
};

export default CheckoutCustomerForm;
