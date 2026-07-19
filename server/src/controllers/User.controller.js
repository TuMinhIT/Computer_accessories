import UserService from "../services/ex.service.js";
import ApiResponse from "../utils/apiResponse.js";
const service = new UserService();

export const createUser = async (req, res) => {
    const user = await service.createUser(req.body);

    res.json(
        new ApiResponse(true, 200, "", user)
    );
}

export const getUsers = async (req, res) => {
    const users = await service.getUsers();

    res.json(users);
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