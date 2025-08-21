import Employee from "../models/EmployeeModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";


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
        await sendEmail(email, "Employee Account Activation", link, "activation");

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
          <html><body style="text-align:center;margin-top:100px;">
            <h1 style="color:green;">✅ Employee activated successfully</h1>
            <p>You can now login to the system.</p>
          </body></html>
        `);
    } catch (error) {
        const decoded = jwt.decode(token);
        return res.send(`
          <html><body style="text-align:center;margin-top:100px;">
            <h1 style="color:red;">❌ Invalid or Expired Token</h1>
            <p>Your activation link has expired.</p>
            ${decoded?.email ? `<a href="/api/employees/resend-activation?email=${decoded.email}">Resend Activation</a>` : ""}
          </body></html>
        `);
    }
};


export const resendActivation = async (req, res) => {
    try {
        const { email } = req.query;
        const employee = await Employee.findOne({ email });

        if (!employee) return res.send("<h1>❌ Employee not found</h1>");
        if (employee.isActive) return res.send("<h1>✅ Account already activated</h1>");

        const token = jwt.sign({ email: employee.email }, process.env.JWT_SECRET, { expiresIn: "1m" });
        const link = `http://localhost:5000/api/employees/activate/${token}`;
        await sendEmail(employee.email, "Resend Employee Account Activation", link, "activation");

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

        if (!employee) return res.json({ success: false, message: "Employee not found" });
        if (!employee.isActive) return res.json({ success: false, message: "Account not activated" });
        if (employee.locked) return res.json({ success: false, message: "Account is blocked by admin" });

        const isMatch = await bcrypt.compare(password, employee.password);
        if (!isMatch) return res.json({ success: false, message: "Invalid password" });

        if (employee.mustChangePassword) {
            return res.json({ success: false, forceChangePassword: true, message: "Please change your password before accessing the system" });
        }

        const token = jwt.sign({ id: employee._id, role: "employee" }, process.env.JWT_SECRET, { expiresIn: "2h" });
        res.json({ success: true, token });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


export const changeEmployeePassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        const employee = await Employee.findOne({ email });

        if (!employee) return res.json({ success: false, message: "Employee not found" });

        employee.password = await bcrypt.hash(newPassword, 10);
        employee.mustChangePassword = false;
        await employee.save();

        res.json({ success: true, message: "Password changed successfully. You can now login." });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


export const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone, salary } = req.body;

        const employee = await Employee.findByIdAndUpdate(id, { name, email, phone, salary }, { new: true });
        if (!employee) return res.status(404).json({ success: false, message: "Employee not found" });

        res.json({ success: true, message: "Employee updated successfully", data: employee });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


export const toggleBlockEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findById(id);
        if (!employee) return res.status(404).json({ success: false, message: "Employee not found" });

        employee.locked = !employee.locked;
        await employee.save();

        res.json({ success: true, message: employee.locked ? "Employee blocked" : "Employee unblocked", data: employee });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


export const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findByIdAndDelete(id);
        if (!employee) return res.status(404).json({ success: false, message: "Employee not found" });

        res.status(200).json({ success: true, message: "Employee deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const employee = await Employee.findOne({ email });
        if (!employee) return res.json({ success: false, message: "Email not found" });

        const resetToken = crypto.randomBytes(32).toString("hex");
        const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

        employee.resetPasswordToken = hashedToken;
        employee.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
        await employee.save();

        const resetLink = `http://localhost:5173/reset-password/${resetToken}`;
        await sendEmail(employee.email, "Password Reset Request", resetLink, "forgot");

        res.json({ success: true, message: "Password reset link sent to email" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};


export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;

        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
        const employee = await Employee.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!employee) return res.json({ success: false, message: "Invalid or expired token" });

        employee.password = await bcrypt.hash(newPassword, 10);
        employee.resetPasswordToken = undefined;
        employee.resetPasswordExpire = undefined;

        await employee.save();
        res.json({ success: true, message: "Password reset successful" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
