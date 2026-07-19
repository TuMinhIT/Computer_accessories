
import { CategoryRepository } from "../database/repositories/CategoryRepository.js";
export class CategoryService {
    categoryRepository;
    constructor() {
        this.categoryRepository = new CategoryRepository();
    }

    async createCategory(data) {
        const existed = await this.categoryRepository.findByName(data.name);
        if (existed) {
            throw new Error("Category already exists");
        }
        return await this.categoryRepository.create(data);
    }

    async updateCategory(id, data) {
        return await this.categoryRepository.updateById(id, data);
    }

    async deleteCategory(id) {
        return await this.categoryRepository.deleteById(id);
    }

    async get(id) {
        return await this.categoryRepository.findById(id);
    }

    async getAll() {
        return await this.categoryRepository.findAll();
    }

}

export default new CategoryService();