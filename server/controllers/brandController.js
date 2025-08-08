import Brands from "../models/BrandModel.js";

export const getBrands = async (req, res) => {
  const brands = await Brands.find();
  if (brands.length === 0) {
    res.send({
      success: false,
      message: "No brands found",
      data: [],
    });
  } else {
    res.send({
      success: true,
      data: brands,
    });
  }
};

export const createBrand = async (req, res) => {
  try {
    const brand = new Brands(req.body);
    const saved = await brand.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateBrand = async (req, res) => {
  try {
    const updated = await Brands.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteBrand = async (req, res) => {
  try {
    await Brands.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
