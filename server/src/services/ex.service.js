import { UserRepository } from "../repositories/UserRepository";

export class UserService {
    userRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async createUser(data) {
        const existed = await this.userRepository.findByEmail(data.email);

        if (existed) {
            throw new Error("Email already exists");
        }

        return await this.userRepository.create(data);
    }

    async getUsers() {
        return await this.userRepository.findAll();
    }

    async getUser(id) {
        return await this.userRepository.findById(id);
    }

    async deleteUser(id) {
        return await this.userRepository.deleteById(id);
    }
}

export default new UserService();