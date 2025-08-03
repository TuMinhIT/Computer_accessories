import Subcategory from '../models/SubcategoryModel.js';

export const getSubcategories = async (req, res) => {
    const subcategories = await Subcategory.find().populate('category');
    res.json(subcategories);
};

export const createSubcategory = async (req, res) => {
    try {
        const subcategory = new Subcategory(req.body);
        const saved = await subcategory.save();
        res.send({
            success: true,
            message: "Products fetched successfully",
            //   data: products,
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const updateSubcategory = async (req, res) => {
    try {
        const updated = await Subcategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const deleteSubcategory = async (req, res) => {
    try {
        await Subcategory.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
