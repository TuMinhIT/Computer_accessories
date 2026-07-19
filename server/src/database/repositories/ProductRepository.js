import { GenericRepository } from "./GenericRepository.js";
import UserModel from "../models/UserModel.js";

export class UserRepository extends GenericRepository {
    constructor() {
        super(UserModel);
    }

    async findByEmail(email) {
        return await this.model.findOne({
            email: email
        });
    }
}