import { GenericRepository } from "./GenericRepository.js";
import TokenModel from "../models/TokenModel.js";

export class TokenRepository extends GenericRepository {
    constructor() {
        super(TokenModel);
    }

    async findByUserId(userId) {
        return await this.model.findOne({ user: userId });
    }


}