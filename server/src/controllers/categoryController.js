import { CategoryService } from "../services/category.service.js";
import ApiResponse from "../utils/apiResponse.js";
const service = new CategoryService();

export const getCategories = async (req, res) => {
  const categories = await service.getAll()
  return res.json(
    new ApiResponse(
      {
        success: true,
        data: categories,
      })
  );
};

export const getCategory = async (req, res) => {
  const { id } = req.params;
  const category = await service.get(id);
  if (category) {
    return res.json(
      new ApiResponse(
        {
          success: true,
          data: category,
        })
    );
  } else
    return res.json(
      new ApiResponse(
        {
          success: false,
          message: "Category not found!",
        })
    );
};

export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = await service.createCategory({ name, description });
    return res.send(
      new ApiResponse(
        {
          success: true,
          message: "Category created successfully",
          category: category,
        })
    );
  } catch (err) {
    return res.send(
      new ApiResponse(
        {
          success: false,
          message: err.message,
        })
    );
  }
};

export const updateCategory = async (req, res) => {

  const { id } = req.params;
  const { name, description } = req.body;
  const updated = await service.updateCategory(id, { name, description });
  return res.send(
    new ApiResponse(
      {
        success: true,
        message: "Category updated successfully",
        category: updated,
      })
  );

};

export const deleteCategory = async (req, res) => {

  const { id } = req.params;
  const category = await service.deleteCategory(id);

  if (!category) {
    return res.json(
      new ApiResponse(
        {
          success: false,
          message: "Category not found",
        })
    );
  }
  res.json(
    new ApiResponse(
      {
        success: true,
        message: "Category deleted successfully",
      })
  );
};
