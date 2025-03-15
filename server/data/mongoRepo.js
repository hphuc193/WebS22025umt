import { Category, User } from "./models/index.js";

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