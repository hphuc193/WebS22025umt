import { Category, User, Souvenir } from "./models/index.js";
import mongoose from "mongoose";

const db = {
  categories: {
    getAll: async () => {
      const items = await Category.find();
      return items;
    },
    create: async ({ name }) => {
      const created = await Category.create({
        name: name,
      });
      return created;
    },

    findById: async (id) => await Category.findById(id),

    deleteById: async (id) => {
        const result = await Category.findByIdAndDelete(id);
        return result != null;
    },

    updateById: async (id, { name }) => {
        const result = await Category.findOneAndUpdate({ _id: id }, { name });
        if (result != null) {
          return await Category.findById(id);
        }
        return result;
    },
  },

  souvenirs: {
    getAll: async () => {
      const items = await Souvenir.find();
      return items;
    },
    create: async ({ name, description, price }) => {
      try {
        const created = await Souvenir.create({
          name,
          description,
          price,
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
    updateById: async (id, { name, description, price }) => {
      try {
        const result = await Souvenir.findByIdAndUpdate(
          id,
          { name, description, price },
          { new: true, runValidators: true } // Trả về dữ liệu mới & kiểm tra lỗi
        );
        return result;
      } catch (error) {
        console.error("Error updating souvenir:", error);
        throw new Error("Failed to update souvenir.");
      }
    },
  },

  users: {
    findOne: async (username) => {
      return await User.findOne({ username }).lean();
    },
  },
};

// // Lưu trữ
// localStorage.setItem("accessToken", token);

// // Truy xuất
// const token = localStorage.getItem("accessToken");

export { db };