import { GenericRepository } from "./GenericRepository.js";
import BrandModel from "../models/BrandModel.js";

export class BrandRepository extends GenericRepository {
    constructor() {
        super(BrandModel);
    }


}