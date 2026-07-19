import Article from "../models/article.model.js";
import ApiError from "../utils/apiError.js";
import mongoose from "mongoose";

const createArticle = async (data) => {
  const articleData = {
    title: data.title.trim(),
    summary: data.summary,
    content: data.content,
    thumbnail: data.thumbnail,
    plant: data.plant,
  };

  const existingArticle = await Article.findOne({ title: articleData.title });
  if (existingArticle) {
    throw new ApiError(
      409,
      `Article with title "${articleData.title}" already exists`,
    );
  }

  const article = await Article.create(articleData);
  return article;
};

const getArticles = async () => {
  const articles = await Article.find()
    .populate("plant")
    .sort({ createdAt: 1 });
  return articles;
};

const getArticlesByPlant = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid plant id");
  }

  const articles = await Article.find({ plant: id })
    .populate("plant")
    .sort({ createdAt: -1 });
  return articles;
};

const updateArticle = async (id, data) => {
  const article = await Article.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  }).populate("plant");

  if (!article) {
    throw new ApiError(404, "Article not found");
  }

  return article;
};

const deleteArticle = async (id) => {
  const article = await Article.findById(id);
  if (!article) {
    throw new ApiError(404, "Article not found");
  }

  await Article.findByIdAndDelete(id);
  return article;
};

export default {
  createArticle,
  getArticles,
  updateArticle,
  deleteArticle,
  getArticlesByPlant,
};
