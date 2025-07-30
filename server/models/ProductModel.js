import mongoose from "mongoose";
// id	UUID
// name	String
// barcode	String
// category	String
// brand	String
// price	Decimal giá bán
// cost	Decimal  gía gốc
// stock	Int tồn kho
// warrantyMonths	Int //tháng bảo hành
// imageUrl	String[]
///bestseller bôlean
// createdAt	DateTime
// updatedAt	DateTime

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  discription: {
    type: String,
    required: true,
  },
  barcode: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },

  image: {
    type: [String],
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  warrantyMonths: {
    type: Number,
  },

  bestseller: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

const productModel =
  mongoose.models.producst || mongoose.model("products", productSchema);

export default productModel;
