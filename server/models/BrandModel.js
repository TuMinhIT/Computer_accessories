import mongoose from "mongoose";

const BrandsSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  description: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
    required: true,
    trim: true,
  },
});

const Brands = mongoose.model("brands", BrandsSchema);
export default Brands;
