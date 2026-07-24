import { v2 as cloudinary } from "cloudinary";
import { BrandService } from "../services/brand.service.js";
import Brands from "../database/models/BrandModel.js";

const brandService = new BrandService();

export const getBrands = async (req, res) => {
  try {
    const brands = await brandService.getBrands();
    res.send({
      success: true,
      data: brands.reverse(),
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
    console.log(err.message);
  }
};

export const createBrand = async (req, res) => {

  const { name, description } = req.body;
  const existingBrand = await Brands.findOne({ name });
  if (existingBrand) {
    return res.send({
      success: false,
      message: "Brand already exists",
    });
  }
  const brand = new Brands({ name, description });
  const saved = await brand.save();
  res.send({
    success: true,
    data: saved,
  });

};

export const updateBrand = async (req, res) => {
  try {
    const { name, description } = req.body;
    const brand = await Brands.findById(req.params.id);
    if (!brand) {
      return res.send({ success: false, message: "Brand not found" });
    }

    if (name && name !== brand.name) {
      const existingBrand = await Brands.findOne({ name });
      if (existingBrand && existingBrand._id.toString() !== req.params.id) {
        return res.send({
          success: false,
          message: "Brand name already exists",
        });
      }
    }
    brand.name = name || brand.name;
    brand.description = description || brand.description;
    await brand.save();
    res.send({ success: true, data: brand });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: "Failed to update brand  " + err.message,
    });
  }
};

export const deleteBrand = async (req, res) => {
  try {
    const id = req.params.id;
    const brand = await Brands.findById(id);
    if (!brand) {
      return res.json({
        success: false,
        message: "Brand not found",
      });
    }


    await Brands.findByIdAndDelete(id);
    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Failed to delete brand" + err.message,
    });
  }
};
