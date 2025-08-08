import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    items: [
        {
            productName: String,
            quantity: Number,
            price: Number,
        },
    ],
    total: Number,
    paid: Number,
    change: Number,
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Order', orderSchema);
