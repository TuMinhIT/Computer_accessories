import Notification from "../models/notification.model.js";
import ApiError from "../utils/apiError.js";

import { emailTransporter } from "./mailer.js";
import { generateUniqueOTP, cleanExpiredOTPs } from "../utils/otpUtil.js";
import { generateRegisterWelcomeEmail } from "../templates/RegisterTemplate.js";
import { generateForgotPasswordEmail } from "../templates/ForgotPasswordTemplate.js";
import { generateOrderEmailTemplate } from "../templates/OrderTemplate.js";
import { generateOrderSuccessEmailTemplate } from "../templates/OrderSuccess.js";
// Notification Service
const notificationService = {
  // Send OTP for password reset
  sendOTP: async (email, type = "password_reset") => {
    try {
      // Clean old ones first
      await cleanExpiredOTPs();

      // Rate limit check
      const last = await Notification.findOne({ email, type }).sort({
        createdAt: -1,
      });
      if (last && last.sentAt) {
        const oneMinuteAgo = new Date(Date.now() - 60 * 1000);
        if (last.sentAt > oneMinuteAgo && last.status === "sent") {
          throw new ApiError(
            429,
            "Vui lòng chờ trước khi yêu cầu mã OTP mới",
            "RateLimit",
          );
        }
      }

      // Generate OTP & expiration
      const otp = await generateUniqueOTP();
      const expiresAt = new Date(Date.now() + 3 * 60 * 1000); // 3 phút

      let htmlContent;
      let subject;

      if (type === "password_reset") {
        // Generate password reset email content
        htmlContent = generateForgotPasswordEmail({
          userName: email,
          otpCode: otp,
        });
        subject = "Mã đặt lại mật khẩu";
      } else {
        throw new ApiError(400, "Loại OTP không hợp lệ", "ValidationError");
      }

      // Save to DB
      const notification = await Notification.create({
        email,
        type,
        subject,
        otp,
        expiresAt,
      });

      // Send email
      await emailTransporter.sendMail({
        from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
        to: email,
        subject,
        html: htmlContent,
      });

      notification.sentAt = new Date();
      await notification.save();

      return {
        success: true,
        message: "OTP đã được gửi",
        expiresIn: 300,
      };
    } catch (error) {
      if (error instanceof ApiError) throw error;
      console.error("Error in sendOTP:", error);
      throw new ApiError(500, "Không thể gửi OTP", "EmailError");
    }
  },

  // Send OTP for order confirmation
  sendOrderOTP: async (orderData) => {
    try {
      const { email, customerName, orderCode, orderItems, totalAmount } =
        orderData;
      const type = "order_confirmation";

      // Clean old ones first
      await cleanExpiredOTPs();

      // Rate limit check
      const last = await Notification.findOne({ email, type }).sort({
        createdAt: -1,
      });
      if (last && last.sentAt) {
        const oneMinuteAgo = new Date(Date.now() - 60 * 1000);
        if (last.sentAt > oneMinuteAgo && last.status === "sent") {
          throw new ApiError(
            429,
            "Vui lòng chờ trước khi yêu cầu mã OTP mới",
            "RateLimit",
          );
        }
      }

      // Generate OTP & expiration
      const otp = await generateUniqueOTP();
      const expiresAt = new Date(Date.now() + 3 * 60 * 1000); // 3 phút

      // Generate order confirmation email content
      const htmlContent = generateOrderEmailTemplate({
        customerName,
        orderCode,
        otpCode: otp,
        orderItems,
        totalAmount,
      });

      const subject = `Xác nhận đơn hàng #${orderCode}`;

      // Save to DB
      const notification = await Notification.create({
        email,
        type,
        subject,
        otp,
        expiresAt,
      });

      // Send email
      await emailTransporter.sendMail({
        from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
        to: email,
        subject,
        html: htmlContent,
      });

      // Update status
      console.log(otp);

      notification.sentAt = new Date();
      await notification.save();

      return {
        success: true,
        message: "OTP xác nhận đơn hàng đã được gửi",
        expiresIn: 300,
        orderCode,
      };
    } catch (error) {
      if (error instanceof ApiError) throw error;
      console.error("Error in sendOrderOTP:", error);
      throw new ApiError(
        500,
        "Không thể gửi OTP xác nhận đơn hàng",
        "EmailError",
      );
    }
  },

  // Send OTP for order confirmation
  sendOrderSuccess: async (orderData) => {
    try {
      const {
        email,
        customerName,
        orderCode,
        orderItems,
        totalAmount,
        shippingAddress,
      } = orderData;
      const type = "order_success";

      // Clean old ones first
      await cleanExpiredOTPs();

      // Generate order confirmation email content
      const htmlContent = generateOrderSuccessEmailTemplate({
        customerName,
        orderCode,
        orderItems,
        totalAmount,
        paymentMethod,
        shippingAddress,
      });

      const subject = `Xác nhận đơn hàng #${orderCode}`;

      // Save to DB
      const notification = await Notification.create({
        email,
        type,
        subject,
        otp,
        expiresAt,
      });

      // Send email
      await emailTransporter.sendMail({
        from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
        to: email,
        subject,
        html: htmlContent,
      });

      notification.sentAt = new Date();
      await notification.save();

      return {
        success: true,
        message: "OTP xác nhận đơn hàng đã được gửi",
        expiresIn: 300,
        orderCode,
      };
    } catch (error) {
      if (error instanceof ApiError) throw error;
      console.error("Error in sendOrderOTP:", error);
      throw new ApiError(
        500,
        "Không thể gửi OTP xác nhận đơn hàng",
        "EmailError",
      );
    }
  },

  // Send OTP for registration
  sendRegisterOTP: async (email, userName = "") => {
    try {
      const type = "register_otp";
      // Clean old ones first
      await cleanExpiredOTPs();

      // Rate limit check
      const last = await Notification.findOne({ email, type }).sort({
        createdAt: -1,
      });

      if (last && last.sentAt) {
        const oneMinuteAgo = new Date(Date.now() - 60 * 1000);
        if (last.sentAt > oneMinuteAgo && last.status === "sent") {
          throw new ApiError(
            429,
            "Vui lòng chờ trước khi yêu cầu mã OTP mới",
            "RateLimit",
          );
        }
      }

      // Generate OTP & expiration
      const otp = await generateUniqueOTP();
      const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 phút

      // Import RegisterTemplate
      // const { generateRegisterWelcomeEmail } = await import(
      //   "../templates/RegisterTemplate.js"
      // );

      // Generate registration email content
      const htmlContent = generateRegisterWelcomeEmail({
        userName: userName || email,
        otpCode: otp,
      });
      const subject = "Xác nhận đăng ký tài khoản - Plantdoctor";

      // Save to DB
      const notification = await Notification.create({
        email,
        type,
        subject,
        otp,
        expiresAt,
      });

      // Send email
      await emailTransporter.sendMail({
        from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
        to: email,
        subject,
        html: htmlContent,
      });

      notification.sentAt = new Date();
      await notification.save();

      return {
        success: true,
        message: "Mã OTP đăng ký đã được gửi",
        expiresIn: 300,
      };
    } catch (error) {
      if (error instanceof ApiError) throw error;
      console.error("Error in sendRegisterOTP:", error);
      throw new ApiError(500, "Không thể gửi OTP đăng ký", "EmailError");
    }
  },

  // Verify OTP
  verifyOTP: async (email, otp, type = "password_reset") => {
    try {
      console.log(email);
      const notification = await Notification.findOne({
        email,
        otp,
        type,
        expiresAt: { $gt: new Date() },
      }).sort({ createdAt: -1 });

      if (!notification) {
        throw new ApiError(
          400,
          "OTP không hợp lệ hoặc đã hết hạn",
          "ValidationError",
        );
      }

      // Mark as verified
      await notification.save();

      return {
        success: true,
        verified: true,
        message: "Xác thực OTP thành công",
        data: {
          email,
          type,
          notificationId: notification._id,
        },
      };
    } catch (error) {
      if (error instanceof ApiError) throw error;
      console.error("Error in verifyOTP:", error);
      throw new ApiError(500, "Lỗi khi xác thực OTP", "DatabaseError");
    }
  },
};

// Auto cleanup expired OTPs every 50 minutes
setInterval(cleanExpiredOTPs, 50 * 60 * 1000);

export default notificationService;
