import Timeline from "../models/timeline.model.js";
import Plant from "../models/plant_model.js";
import ApiError from "../utils/apiError.js";

const processService = {
  // Timeline CRUD
  createTimeline: async (data) => {
    // Verify tree/plant exists
    const plant = await Plant.findById(data.treeId);
    if (!plant) {
      throw new ApiError(404, "Bonsai tree (plant) not found");
    }

    const timeline = await Timeline.create(data);
    return timeline;
  },

  getTimelinesByPlantId: async (treeId) => {
    return await Timeline.find({ treeId }).sort({ date: 1 });
  },

  getTimelineById: async (id) => {
    const timeline = await Timeline.findById(id);
    if (!timeline) {
      throw new ApiError(404, "Timeline entry not found");
    }
    return timeline;
  },

  updateTimeline: async (id, data) => {
    if (data.treeId) {
      const plant = await Plant.findById(data.treeId);
      if (!plant) {
        throw new ApiError(404, "Bonsai tree (plant) not found");
      }
    }

    const timeline = await Timeline.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!timeline) {
      throw new ApiError(404, "Timeline entry not found");
    }
    return timeline;
  },

  deleteTimeline: async (id) => {
    const timeline = await Timeline.findById(id);
    if (!timeline) {
      throw new ApiError(404, "Timeline entry not found");
    }
    await Timeline.findByIdAndDelete(id);
    return timeline;
  },
};

export default processService;