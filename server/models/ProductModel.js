import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  barcode: { type: String, required: true, unique: true },

  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  subcategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory', required: true },


  brand: { type: String, required: true },
  price: { type: Number, required: true },
  cost: { type: Number, required: true },
  stock: { type: Number, required: true },
  warrantyMonths: { type: Number },
  imageUrl: { type: [String], required: true },
  bestseller: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

productSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Product = mongoose.model('Product', productSchema);
export default Product;
