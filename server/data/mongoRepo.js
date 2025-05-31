import { Category, User, Souvenir, Motorbike } from "./models/index.js";
import mongoose from "mongoose";

const db = {
  souvenirs: {
    getAll: async () => {
      const items = await Souvenir.find();
      return items;
    },

    // Thêm phương thức mới để hỗ trợ phân trang, lọc và sắp xếp
    getAllWithOptions: async (query = {}, sort = {}, skip = 0, limit = 10) => {
      const items = await Souvenir.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit);
      return items;
    },

    create: async ({ name, description, price, images }) => {
      try {
        const created = await Souvenir.create({
          name,
          description,
          price,
          images: images || [], // Đảm bảo images là mảng
        });
        return created;
      } catch (error) {
        console.error("Error creating souvenir:", error);
        throw new Error("Failed to create souvenir.");
      }
    },

    findById: async (id) => await Souvenir.findById(id),

    deleteById: async (id) => {
      try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
          throw new Error("Invalid souvenir ID format.");
        }
        const result = await Souvenir.findByIdAndDelete(id);
        if (!result) {
          throw new Error("Souvenir not found.");
        }
        return { success: true, message: "Souvenir deleted successfully." };
      } catch (error) {
        console.error("Error deleting souvenir:", error);
        throw new Error("Failed to delete souvenir.");
      }
    },

    updateById: async (id, { name, description, price, images }) => {
      try {
        const result = await Souvenir.findByIdAndUpdate(
          id,
          { name, description, price, images: images || [] }, // Đảm bảo images là mảng
          { new: true, runValidators: true }
        );
        if (!result) throw new Error("Souvenir not found");
        return result;
      } catch (error) {
        console.error("Error updating souvenir:", error);
        throw new Error("Failed to update souvenir.");
      }
    },
  },

  motorbikes: {
    getAll: async () => {
      const items = await Motorbike.find();
      return items;
    },

    // Thêm phương thức mới để hỗ trợ phân trang, lọc và sắp xếp
    getAllWithOptions: async (query = {}, sort = {}, skip = 0, limit = 10) => {
      const items = await Motorbike.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit);
      return items;
    },

    create: async ({ stt, name, pricePerDay, quantity, images }) => {
      try {
        const created = await Motorbike.create({
          stt,
          name,
          pricePerDay,
          quantity,
          images: images || [],
        });
        return created;
      } catch (error) {
        console.error("Error creating motorbike:", error);
        throw new Error("Failed to create motorbike.");
      }
    },

    findById: async (id) => await Motorbike.findById(id),

    deleteById: async (id) => {
      try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
          throw new Error("Invalid motorbike ID format.");
        }
        const result = await Motorbike.findByIdAndDelete(id);
        if (!result) {
          throw new Error("Motorbike not found.");
        }
        return { success: true, message: "Motorbike deleted successfully." };
      } catch (error) {
        console.error("Error deleting motorbike:", error);
        throw new Error("Failed to delete motorbike.");
      }
    },

    updateById: async (id, { stt, name, pricePerDay, quantity, images }) => {
      try {
        const result = await Motorbike.findByIdAndUpdate(
          id,
          { stt, name, pricePerDay, quantity, images: images || [] },
          { new: true, runValidators: true }
        );
        if (!result) throw new Error("Motorbike not found");
        return result;
      } catch (error) {
        console.error("Error updating motorbike:", error);
        throw new Error("Failed to update motorbike.");
      }
    },
  },

  users: {
    findOne: async (username) => {
      return await User.findOne({ username }).lean();
    },
  },
};

export { db };
