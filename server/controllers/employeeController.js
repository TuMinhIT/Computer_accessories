import Employee from "../models/EmployeeModel.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

const sendEmail = async (to, subject, link) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const htmlContent = `
    <div style="font-family: Arial, sans-serif; background-color:#f4f4f7; padding:30px; text-align:center;">
      <div style="max-width:600px; margin:auto; background:white; padding:20px; border-radius:10px; box-shadow:0 4px 10px rgba(0,0,0,0.1);">
        <h2 style="color:#333;">👋 Welcome to Our System</h2>
        <p style="font-size:16px; color:#555;">
          Your employee account has been created. Please activate your account within <b>1 minute</b>.
        </p>
        
        <a href="${link}" 
          style="display:inline-block; margin:20px 0; padding:12px 24px; background:#2563eb; color:white; text-decoration:none; border-radius:6px; font-size:16px;">
          ✅ Activate Account
        </a>

        <hr style="margin:30px 0; border:0; border-top:1px solid #eee;" />

        <p style="font-size:12px; color:#aaa;">
          © ${new Date().getFullYear()} Company Inc. All rights reserved.
        </p>
      </div>
    </div>
  `;

    await transporter.sendMail({
        from: `"HR Department" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html: htmlContent,
    });
};

export const addEmployee = async (req, res) => {
    try {
        const { name, email, phone, salary } = req.body;

        const defaultPassword = email.split("@")[0];
        const hashedPassword = await bcrypt.hash(defaultPassword, 10);

        const employee = await Employee.create({
            name,
            email,
            phone,
            salary,
            password: hashedPassword,
            isActive: false,
            mustChangePassword: true,
        });

        const token = jwt.sign(
            { email: employee.email },
            process.env.JWT_SECRET,
            { expiresIn: "1m" }
        );

        const link = `http://localhost:5000/api/employees/activate/${token}`;

        await sendEmail(email, "Employee Account Activation", link);

        res.json({ success: true, message: "Employee added & email sent", data: employee });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const activateEmployee = async (req, res) => {
    const { token } = req.params;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const employee = await Employee.findOne({ email: new RegExp(`^${decoded.email}$`, "i") });

        if (!employee) {
            return res.send("<h1>❌ Employee not found</h1>");
        }

        employee.isActive = true;
        await employee.save();

        return res.send(`
      <html>
        <head><title>Activation Success</title></head>
        <body style="font-family: Arial; text-align:center; margin-top:100px; background:#f9fafb;">
          <div style="background:white; border:1px solid #ddd; padding:30px; border-radius:8px; display:inline-block; box-shadow:0 2px 6px rgba(0,0,0,0.1);">
            <h1 style="color:green;">✅ Employee activated successfully</h1>
            <p>You can now login to the system.</p>
          </div>
        </body>
      </html>
    `);
    } catch (error) {
        const decoded = jwt.decode(token);

        return res.send(`
      <html>
        <head><title>Activation Failed</title></head>
        <body style="font-family: Arial; text-align:center; margin-top:100px; background:#fef2f2;">
          <div style="background:white; border:1px solid #fca5a5; padding:30px; border-radius:8px; display:inline-block; box-shadow:0 2px 6px rgba(0,0,0,0.1);">
            <h1 style="color:red;">❌ Invalid or Expired Token</h1>
            <p>Your activation link has expired.</p>
            ${decoded?.email
                ? `<a class="button" href="/api/employees/resend-activation?email=${decoded.email}" 
                     style="display:inline-block; margin-top:20px; padding:12px 24px; background:#2563eb; color:white; text-decoration:none; border-radius:6px; font-size:14px;">
                     🔄 Resend Activation Email</a>`
                : ""
            }
          </div>
        </body>
      </html>
    `);
    }
};


export const resendActivation = async (req, res) => {
    try {
        const { email } = req.query;
        const employee = await Employee.findOne({ email });

        if (!employee) {
            return res.send("<h1>❌ Employee not found</h1>");
        }

        if (employee.isActive) {
            return res.send("<h1>✅ Account already activated</h1>");
        }

        const token = jwt.sign(
            { email: employee.email },
            process.env.JWT_SECRET,
            { expiresIn: "1m" }
        );

        const link = `http://localhost:5000/api/employees/activate/${token}`;
        await sendEmail(employee.email, "Resend Employee Account Activation", link);

        res.send("<h1>📧 New activation email sent. Please check your inbox.</h1>");
    } catch (error) {
        res.send("<h1>❌ Error resending activation email</h1>");
    }
};


export const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find().sort({ createdAt: -1 });
        res.json({ success: true, data: employees });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const loginEmployee = async (req, res) => {
    try {
        const { email, password } = req.body;

        const employee = await Employee.findOne({ email });
        if (!employee) {
            return res.json({ success: false, message: "Employee not found" });
        }

        if (!employee.isActive) {
            return res.json({ success: false, message: "Account not activated" });
        }

        const isMatch = await bcrypt.compare(password, employee.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid password" });
        }

        if (employee.mustChangePassword) {
            return res.json({
                success: false,
                forceChangePassword: true,
                message: "Please change your password before accessing the system",
            });
        }

        const token = jwt.sign(
            { id: employee._id, role: "employee" },
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
        );

        res.json({ success: true, token });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const changeEmployeePassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        const employee = await Employee.findOne({ email });
        if (!employee) {
            return res.json({ success: false, message: "Employee not found" });
        }

        const hashed = await bcrypt.hash(newPassword, 10);
        employee.password = hashed;
        employee.mustChangePassword = false;
        await employee.save();

        res.json({ success: true, message: "Password changed successfully. You can now login." });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};