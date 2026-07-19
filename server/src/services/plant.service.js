import Plant from "../models/plant_model.js";
import ApiError from "../utils/apiError.js";

const plantService = {
  createPlant: async (userId, data) => {
    console.log(data);
    const plantData = {
      ownerId: userId,
      name: data.name.trim(),
      displayImage: data.displayImage,
      pastImage: data.pastImage,
      currentImage: data.currentImage,
      age: data.age,
      createdYear: data.createdYear,
      style: data.style,
      description: data.description,
    };
    const plant = await Plant.create(plantData);
    return plant;
  },

  getPlants: async () => {
    const plants = await Plant.find().sort({ createdAt: 1 });
    return plants;
  },

  getPlantsById: async (id) => {
    const plants = await Plant.findById(id);
    return plants;
  },

  updatePlant: async (id, data) => {
    const plant = await Plant.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).populate("category");

    if (!plant) {
      throw new ApiError(404, "Plant not found");
    }

    return plant;
  },

  deletePlant: async (id) => {
    const plant = await Plant.findById(id);

    if (!plant) {
      throw new ApiError(404, "Plant not found");
    }

    await Plant.findOneAndDelete(id);
    return plant;
  },
};

export default plantService;
