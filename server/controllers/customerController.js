import Customer from '../models/CustomerModel.js';
import Order from '../models/OrderModel.js';

export const findOrCreateCustomer = async (req, res) => {
    try {
        const { phone, fullName, address } = req.body;

        let customer = await Customer.findOne({ phone });

        if (!customer && (!fullName || !address)) {
            return res.status(400).json({ message: 'Khách hàng mới cần nhập đầy đủ họ tên và địa chỉ.' });
        }

        if (!customer) {
            customer = await Customer.create({ fullName, phone, address });
        }

        res.json(customer);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getCustomerOrders = async (req, res) => {
    try {
        const { customerId } = req.params;
        const orders = await Order.find({ customer: customerId });

        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};