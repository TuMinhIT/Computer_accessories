import Categories from "../models/CategoryModel.js";

export const getCategories = async (req, res) => {
  const categories = await Categories.find();
  res.send({
    success: true,
    data: categories,
  });
};

export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const existingCategory = await Categories.findOne({ name });
    if (existingCategory) {
      return res.send({
        success: false,
        message: "Category already exists",
      });
    }

    const category = new Categories({ name, description });
    await category.save();

    res.send({
      success: true,
      message: "Category created successfully",
      category: category,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
    console.log(err.message);
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { _id, name, description } = req.body;

    const updated = await Categories.findByIdAndUpdate(_id, {
      name,
      description,
    });

    if (!updated) {
      return res.send({
        success: false,
        message: "Category not found",
      });
    }
    res.send({
      success: true,
      message: "Category updated successfully",
      category: updated,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
    console.log(err.message);
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.body;
    const category = await Categories.findByIdAndDelete(id);

    if (!category) {
      return res.send({
        success: false,
        message: "Category not found",
      });
    }
    res.send({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
    console.log(err.message);
  }
};
