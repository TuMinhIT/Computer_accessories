
import Product from '../models/ProductModel.js';

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('category').populate('subcategory');
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const createProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const saved = await newProduct.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
