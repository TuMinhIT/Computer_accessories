import nodemailer from "nodemailer";

const sendEmail = async (to, subject, link, type = "activation") => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let htmlContent = "";

    if (type === "activation") {
      htmlContent = `
      <div style="font-family: Arial, sans-serif; background-color:#f4f4f7; padding:30px; text-align:center;">
        <div style="max-width:600px; margin:auto; background:white; padding:20px; border-radius:10px; box-shadow:0 4px 10px rgba(0,0,0,0.1);">
          <h2 style="color:#333;">👋 Chào mừng đến với Hệ thống của chúng tôi</h2>
          <p style="font-size:16px; color:#555;">
            Tài khoản nhân viên của bạn đã được tạo. Vui lòng kích hoạt tài khoản trong vòng <b>1 phút</b>.
          </p>
          <a href="${link}" 
            style="display:inline-block; margin:20px 0; padding:12px 24px; background:#2563eb; color:white; text-decoration:none; border-radius:6px; font-size:16px;">
            ✅ Kích hoạt tài khoản
          </a>
          <hr style="margin:30px 0; border:0; border-top:1px solid #eee;" />
          <p style="font-size:12px; color:#aaa;">© ${new Date().getFullYear()} Company Inc. All rights reserved.</p>
        </div>
      </div>
    `;
    } else if (type === "forgot") {
      htmlContent = `
      <div style="font-family: Arial, sans-serif; background-color:#f4f4f7; padding:30px; text-align:center;">
        <div style="max-width:600px; margin:auto; background:white; padding:20px; border-radius:10px; box-shadow:0 4px 10px rgba(0,0,0,0.1);">
          <h2 style="color:#333;">🔑 Yêu cầu đặt lại mật khẩu</h2>
          <p style="font-size:16px; color:#555;">
            Bạn vừa yêu cầu đặt lại mật khẩu cho tài khoản. Nhấp vào nút bên dưới để tiếp tục:
          </p>
          <a href="${link}" 
            style="display:inline-block; margin:20px 0; padding:12px 24px; background:#2563eb; color:white; text-decoration:none; border-radius:6px; font-size:16px;">
            🔄 Đặt lại mật khẩu
          </a>
          <p style="font-size:14px; color:#999;">Liên kết này chỉ có hiệu lực trong vòng 10 phút.</p>
          <hr style="margin:30px 0; border:0; border-top:1px solid #eee;" />
          <p style="font-size:12px; color:#aaa;">© ${new Date().getFullYear()} Company Inc. All rights reserved.</p>
        </div>
      </div>
    `;
    }

    await transporter.sendMail({
      from: `"HR Department" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: htmlContent,
    });
    console.log("send to " + to);
  } catch (error) {
    console.log(error.message);
  }
};

export default sendEmail;
