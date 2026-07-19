import { v2 as cloudinary } from "cloudinary";
import { BrandService } from "../services/brand.service.js";

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
  try {
    const { name, description } = req.body;
    const existingBrand = await Brands.findOne({ name });
    if (existingBrand) {
      return res.send({
        success: false,
        message: "Brand already exists",
      });
    }

    if (!req.file || !req.file.path) {
      return res.send({
        success: false,
        message: "Image is required",
      });
    }
    let imageUpload = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "image",
      folder: "e-commerce",
    });
    const image = imageUpload.secure_url;

    const brand = new Brands({ name, description, image });
    const saved = await brand.save();
    res.send({
      success: true,
      data: saved,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: "Failed to create brand  " + err.message,
    });
  }
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

    let image = brand.image;
    if (req.file && req.file.path) {
      const publicIdMatch = brand.image.match(/\/e-commerce\/([^\.\/]+)\./);
      if (publicIdMatch && publicIdMatch[1]) {
        const publicId = `e-commerce/${publicIdMatch[1]}`;
        try {
          await cloudinary.uploader.destroy(publicId);
        } catch (e) {
          console.log("Failed to delete old image:", e.message);
        }
      }
      const imageUpload = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "image",
        folder: "e-commerce",
      });
      image = imageUpload.secure_url;
    }

    brand.name = name || brand.name;
    brand.description = description || brand.description;
    brand.image = image;
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
    // / detroy image
    const publicIdMatch = brand.image.match(/\/e-commerce\/([^\.\/]+)\./);
    if (publicIdMatch && publicIdMatch[1]) {
      const publicId = `e-commerce/${publicIdMatch[1]}`;
      try {
        await cloudinary.uploader.destroy(publicId);
      } catch (e) {
        console.log("Failed to delete old image:", e.message);
      }
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
