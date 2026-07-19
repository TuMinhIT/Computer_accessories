import { GenericRepository } from "./GenericRepository.js";
import ProductModel from "../models/ProductModel.js";

export class ProductRepository extends GenericRepository {
    constructor() {
        super(ProductModel);
    }

    async updateStock(productId, quantity) {
        return await this.model.findByIdAndUpdate(
            productId,
            { $inc: { stock: -quantity } },
            { new: true }
        );
    }


}