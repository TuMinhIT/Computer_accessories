import Category from '../models/CategoryModel.js';

export const getCategories = async (req, res) => {
    const categories = await Category.find();
    res.json(categories);
};

export const createCategory = async (req, res) => {
    try {
        const category = new Category(req.body);
        const saved = await category.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const updateCategory = async (req, res) => {
    try {
        const updated = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
