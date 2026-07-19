
import { BrandRepository } from "../database/repositories/BrandRepository.js";
export class BrandService {
    brandRepository;
    constructor() {
        this.brandRepository = new BrandRepository()

    }
    async createBrand(data) {
        const existed = await this.brandRepository.findByName(data.name);
        if (existed) {
            throw new Error("Brand already exists");
        }
        const brand = await this.brandRepository.create(data);
        return brand;
    }

    async getBrands() {
        return await this.brandRepository.find();
    }

    async getBrand(id) {
        return await this.brandRepository.findById(id);
    }

    async deleteBrand(id) {
        return await this.brandRepository.deleteById(id);
    }

    async updateBrand(id, data) {
        const brand = await this.brandRepository.findById(id);
        if (!brand) {
            throw new ApiError(404, "Brand không tồn tại!", "Bad Request");
        }

        const updateData = {};

        if (data.name && data.name !== brand.name) {
            updateData.name = data.name;
        }

        if (data.description && data.description !== brand.description) {
            updateData.description = data.description;
        }

        if (data.image && data.image !== brand.image && data.image != "") {
            updateData.image = data.image;
        }
        if (Object.keys(updateData).length === 0) {
            return brand;
        }
        const updatedBrand = await this.brandRepository.updateById(id, updateData);

        return updatedBrand;
    }

}

export default new BrandService();