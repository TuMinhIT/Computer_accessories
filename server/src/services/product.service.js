
import { ProductRepository } from "../database/repositories/ProductRepository.js";
export class ProductService {
    productRepository;
    constructor() {
        this.productRepository = new ProductRepository()

    }

    async createProduct(data) {
        const existed = await this.productRepository.findByName(data.name);
        if (existed) {
            throw new Error("Product already exists");
        }
        const product = await this.productRepository.create(data);

        return product;
    }

    async updateStock(id, quantity) {
        return await this.productRepository.updateStock(id, quantity);
    }


    async getProducts() {
        return await this.productRepository.find();
    }

    async getProduct(id) {
        return await this.productRepository.findById(id);
    }

    async deleteProduct(id) {
        return await this.productRepository.deleteById(id);
    }

    async updateProduct(id, data) {
        const product = await this.productRepository.findById(id);
        if (!product) {
            throw new ApiError(404, "Product không tồn tại!", "Bad Request");
        }

        const updateData = {};

        if (data.name && data.name !== product.name) {
            updateData.name = data.name;
        }

        if (data.description && data.description !== product.description) {
            updateData.description = data.description;
        }

        if (data.price && data.price !== product.price) {
            updateData.price = data.price;
        }
        if (data.stock && data.stock !== product.stock) {
            updateData.stock = data.stock;
        }

        if (data.category && data.category !== product.category) {
            updateData.category = data.category;
        }
        if (data.image && data.image !== product.image && data.image != "") {
            updateData.image = data.image;
        }
        if (Object.keys(updateData).length === 0) {
            return product;
        }
        const updatedProduct = await this.productRepository.updateById(id, updateData);

        return updatedProduct;
    }

}

export default new ProductService();