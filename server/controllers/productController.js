import Product from "../models/ProductModel.js";
import { v2 as cloudinary } from "cloudinary";
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category")
      .populate("brand");
    res.send({
      success: true,
      data: products.reverse(),
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      barcode,
      category,
      brand,
      price,
      cost,
      stock,
      warrantyMonths,
      bestseller,
    } = req.body;

    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "At least one image is required" });
    }
    // Upload tất cả ảnh lên Cloudinary song song
    const uploadResults = await Promise.all(
      req.files.map((file) =>
        cloudinary.uploader.upload(file.path, {
          resource_type: "image",
          folder: "e-commerce/products",
        })
      )
    );

    // Lấy danh sách secure_url
    const images = uploadResults.map((result) => result.secure_url);

    const newProduct = new Product({
      name,
      description,
      barcode,
      category,
      brand,
      price,
      cost,
      stock,
      warrantyMonths,
      bestseller,
      images,
    });
    const saved = await newProduct.save();

    res.status(201).send({
      success: true,
      data: saved,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
    console.log(err.message);
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      description,
      barcode,
      category,
      brand,
      price,
      cost,
      stock,
      warrantyMonths,
      bestseller,
    } = req.body;

    const existProduct = await Product.findById(req.params.id);
    if (!existProduct) {
      return res.status(404).json({
        success: false,
        message: "Product does not exist!",
      });
    }

    // Nếu muốn giữ lại images
    const images = existProduct.images;

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        barcode,
        category,
        brand,
        price,
        cost,
        stock,
        warrantyMonths,
        bestseller,
        images,
      },
      { new: true }
    );

    return res.json({ success: true, data: updated });

    res.send({
      success: true,
      message: "Update successfully!",
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
    console.log(err.message);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
      return res.json({
        success: false,
        message: "Product not found",
      });
    }

    await Promise.all(
      product.images.map(async (image) => {
        // Tìm publicId từ URL Cloudinary
        const publicIdMatch = image.match(
          /\/e-commerce\/products\/([^\.\/]+)\./
        );

        if (publicIdMatch && publicIdMatch[1]) {
          const publicId = `e-commerce/products/${publicIdMatch[1]}`;
          try {
            await cloudinary.uploader.destroy(publicId);
            console.log(`Deleted image: ${publicId}`);
          } catch (e) {
            console.log("Failed to delete old image:", e.message);
          }
        }
      })
    );

    await Product.findByIdAndDelete(id);
    res.json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
