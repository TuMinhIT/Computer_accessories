import mongoose from "mongoose";

const BrandsSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  description: {
    type: String,
    default: "",
  },
});

const Brands = mongoose.model("brands", BrandsSchema);
export default Brands;
