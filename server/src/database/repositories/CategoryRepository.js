import { GenericRepository } from "./GenericRepository.js";
import CategoryModel from "../models/CategoryModel.js";

export class CategoryRepository extends GenericRepository {
    constructor() {
        super(CategoryModel);
    }

    async findByName(name) {
        return await this.model.findOne({ name });
    }


}