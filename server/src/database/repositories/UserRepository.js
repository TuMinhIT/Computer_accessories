import { GenericRepository } from "./GenericRepository";
import { UserModel } from "../models/User";

export class UserRepository extends GenericRepository {
    constructor() {
        super(UserModel);
    }

    async findByEmail(email) {
        return await this.model.findOne({ email });
    }
}