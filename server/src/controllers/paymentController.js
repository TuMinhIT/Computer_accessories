import Order from "../database/models/OrderModel.js";

// Process payment (mock)
export const processPayment = async (req, res) => {
  try {
    const { orderId, paymentDetails } = req.body;

    if (!orderId) {
      return res.status(400).json({ success: false, message: "Order ID is required" });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    if (order.paid) {
      return res.status(400).json({ success: false, message: "Order is already paid" });
    }

    // Mock payment processing logic here
    // In a real application, you would integrate Stripe, VNPay, PayPal, etc.
    const paymentSuccess = true; // Simulating successful payment

    if (paymentSuccess) {
      order.paid = true;
      order.status = "processing"; // Update status as needed
      await order.save();

      return res.status(200).json({
        success: true,
        message: "Payment processed successfully",
        data: order,
      });
    } else {
      return res.status(400).json({ success: false, message: "Payment failed" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
