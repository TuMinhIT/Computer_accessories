import { UserService } from "../services/user.service.js";
import ApiResponse from "../utils/apiResponse.js";

const service = new UserService();

export const RegisterUser = async (req, res) => {
    const user = await service.createUser(req.body);
    user.password = "xxxxx"
    return res.json(new ApiResponse({
        success: true,
        status: 201,
        message: "User created successfully",
        data: user
    }));
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const result = await service.login(email, password);

    return res.json(new ApiResponse({
        success: true,
        status: 200,
        message: "User logged in successfully",
        data: result
    }));
}


export const getUsers = async (req, res) => {
    const users = await service.getUsers();
    return res.json(new ApiResponse({
        data: users,
        status: 200,
        message: "Users fetched successfully",
        success: true
    }));
}


export const getUser = async (req, res) => {
    const user = await service.getUser(req.params.id);

    res.json(user);
}

export const updateUser = async (req, res) => {
    const user = await service.updateUser(req.params.id, req.body);

    res.json(user);
}

export const deleteUser = async (req, res) => {
    const user = await service.deleteUser(req.params.id);

    res.json(user);
}