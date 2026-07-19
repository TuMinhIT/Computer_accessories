import { UserRepository } from "../database/repositories/UserRepository.js";
import { TokenRepository } from "../database/repositories/TokenRepository.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export class UserService {
    userRepository;
    tokenRepository;
    constructor() {
        this.userRepository = new UserRepository();
        this.tokenRepository = new TokenRepository();
    }

    async createUser(data) {
        const existed = await this.userRepository.findByEmail(data.email);
        if (existed) {
            throw new Error("Email already exists");
        }
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = await this.userRepository.create({
            userName: data.userName,
            email: data.email,
            password: hashedPassword,
            role: data.role,
        });

        return user;
    }


    async getUsers() {

        const Users = await this.userRepository.find({ role: { $ne: "admin" } }).sort({
            createdAt: -1,
        });

        return Users;
    }

    async getUser(id) {
        return await this.userRepository.findById(id);
    }

    async deleteUser(id) {
        return await this.userRepository.deleteById(id);
    }

    async updateInfoUser(id, data) {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new ApiError(404, "User không tồn tại!", "Bad Request");
        }

        const updateData = {};

        if (data.name && data.name !== user.name) {
            updateData.name = data.name;
        }

        if (data.dob && data.dob !== user.dob) {
            updateData.dob = data.dob;
        }

        if (data.gender && data.gender !== user.gender) {
            updateData.gender = data.gender;
        }
        if (data.phone && data.phone !== user.phone) {
            updateData.phone = data.phone;
        }

        if (data.role && data.role !== user.role) {
            updateData.role = data.role;
        }
        if (data.avatar && data.avatar !== user.avatar && data.avatar != "") {
            updateData.avatar = data.avatar;
        }
        // updateData.avatar = user.avatar;

        if (Object.keys(updateData).length === 0) {
            return user;
        }
        const updatedUser = await User.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });

        return updatedUser;
    }

    async login(email, password) {
        const JWT_SECRET = process.env.JWT_SECRET;
        const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;



        const user = await this.userRepository.findByEmail(email);
        if (!user) throw new Error("User not found");




        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error("invalid password");

        }


        const accessToken = jwt.sign(
            { userId: user._id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: "90m" },
        );
        const refreshToken = jwt.sign(
            { userId: user._id },
            JWT_REFRESH_SECRET,
            {
                expiresIn: "7d",
            },
        );

        await this.tokenRepository.create({
            user: user._id,
            token: refreshToken,
            type: "refresh",
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });

        return {
            accessToken,
            refreshToken,
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
                name: user.name,
                avatar: user.avatar && "",
            },
        };
    }


    async refreshAccessToken(userId, refreshToken) {
        const JWT_SECRET = process.env.JWT_SECRET;


        const storedToken = await this.tokenRepository.findOne({
            user: userId,
            type: "refresh",
            refreshToken: refreshToken,
        });
        if (!storedToken) {
            throw new Error(
                "Refresh token not found or expired",
            );
        }

        const user = await this.userRepository.findById(userId);

        if (!user || !user._id) {
            throw new Error(
                "User Not Found",
                "User does not exist in User Service",
            );
        }

        const newAccessToken = jwt.sign(
            { userId: user._id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: "90m" },
        );

        storedToken.refreshToken = refreshToken;
        storedToken.expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        await this.tokenRepository.updateById(storedToken._id, storedToken);

        return {
            accessToken: newAccessToken,
            refreshToken: refreshToken,
        }

    }

    // Change password
    async changePassword(userId, oldPassword, newPassword) {

        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        const isValid = await bcrypt.compare(oldPassword, user.password);
        if (!isValid) {
            throw new Error("Invalid old password");
        }
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
        return user;
    }

    // Forgot password
    async resetPassword(email, newPassword) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error(
                "User Not Found",
                "No account found with that email",
            );
        }
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
        return user;
    }


}

export default new UserService();