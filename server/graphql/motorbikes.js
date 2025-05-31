import { authMiddleware } from "./authMiddleware.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { v4 as uuidv4 } from "uuid";
import { GraphQLUpload } from "graphql-upload";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const typeDef = `
    scalar Upload

    type Motorbike {
        _id: ID!
        stt: Int!
        name: String!
        pricePerDay: Float!
        quantity: Int!
        images: [String!]!
    }

    input MotorbikeInput {
        stt: Int!
        name: String!
        pricePerDay: Float!
        quantity: Int!
        images: [String!]
    }

    type MotorbikeResponse {
        items: [Motorbike!]!
        total: Int!
        page: Int!
        limit: Int!
    }

    input MotorbikeFilter {
        name: String          # Tìm kiếm theo tên
        minPrice: Float       # Giá tối thiểu mỗi ngày
        maxPrice: Float       # Giá tối đa mỗi ngày
    }

    input MotorbikeSort {
        field: String!        # Trường để sắp xếp (name, pricePerDay, etc.)
        order: String!        # Thứ tự: "ASC" hoặc "DESC"
    }

    extend type Query {
        motorbikes(
            page: Int = 1,
            limit: Int = 10,
            filter: MotorbikeFilter,
            sort: MotorbikeSort
        ): MotorbikeResponse!
        motorbike(_id: ID!): Motorbike
    }

    extend type Mutation {
        deleteMotorbike(_id: ID!): DeleteResponse!
        createMotorbike(input: MotorbikeInput!, files: [Upload]): Motorbike!
        updateMotorbike(_id: ID!, input: MotorbikeInput!, files: [Upload]): Motorbike!
        addImagesToMotorbike(_id: ID!, files: [Upload!]!): Motorbike!
    }

    type DeleteResponse {
        success: Boolean!
        message: String!
    }
`;

export const resolvers = {
  Upload: GraphQLUpload,

  Query: {
    motorbikes: authMiddleware(
      async (parent, { page, limit, filter, sort }, context) => {
        let query = {};
        if (filter) {
          if (filter.name) {
            query.name = { $regex: filter.name, $options: "i" }; // Tìm kiếm gần đúng
          }
          if (filter.minPrice || filter.maxPrice) {
            query.pricePerDay = {};
            if (filter.minPrice) query.pricePerDay.$gte = filter.minPrice;
            if (filter.maxPrice) query.pricePerDay.$lte = filter.maxPrice;
          }
        }

        let sortOption = {};
        if (sort && sort.field && sort.order) {
          sortOption[sort.field] = sort.order.toUpperCase() === "ASC" ? 1 : -1;
        }

        const skip = (page - 1) * limit;
        const total = await context.db.motorbikes
          .getAll()
          .then((items) => items.length);
        const items = await context.db.motorbikes.getAllWithOptions(
          query,
          sortOption,
          skip,
          limit
        );

        return {
          items,
          total,
          page,
          limit,
        };
      }
    ),

    motorbike: authMiddleware(async (parent, { _id }, context) => {
      return context.db.motorbikes.findById(_id);
    }),
  },

  Mutation: {
    deleteMotorbike: authMiddleware(
      async (parent, { _id }, context) => {
        try {
          const deleted = await context.db.motorbikes.deleteById(_id);
          if (!deleted.success) {
            return { success: false, message: "Motorbike not found." };
          }
          return { success: true, message: "Motorbike deleted successfully." };
        } catch (error) {
          console.error("Error deleting motorbike:", error);
          return { success: false, message: "Failed to delete motorbike." };
        }
      },
      ["admin", "manager"]
    ),

    createMotorbike: authMiddleware(
      async (parent, { input, files }, context) => {
        console.log("Files received in createMotorbike:", files);
        let imagePaths = input.images || [];
        if (files && files.length > 0) {
          const resolvedFiles = await Promise.all(files);
          imagePaths = await Promise.all(
            resolvedFiles.map(async (file) => {
              console.log("Processing file:", file);
              const { createReadStream, filename } = file;
              if (!createReadStream) throw new Error("Invalid file upload");
              const uniqueName = `${uuidv4()}-${filename}`;
              const filePath = `/img/${uniqueName}`;
              const fileStream = createReadStream();
              await new Promise((resolve, reject) => {
                fileStream
                  .pipe(
                    fs.createWriteStream(
                      path.join(__dirname, "../img", uniqueName)
                    )
                  )
                  .on("finish", resolve)
                  .on("error", reject);
              });
              return filePath;
            })
          );
        }
        const motorbikeData = { ...input, images: imagePaths };
        return context.db.motorbikes.create(motorbikeData);
      },
      ["admin"]
    ),

    updateMotorbike: authMiddleware(
      async (parent, { _id, input, files }, context) => {
        console.log("Files received in updateMotorbike:", files);
        let imagePaths = input.images || [];
        if (files && files.length > 0) {
          const resolvedFiles = await Promise.all(files);
          imagePaths = await Promise.all(
            resolvedFiles.map(async (file) => {
              console.log("Processing file:", file);
              const { createReadStream, filename } = file;
              if (!createReadStream) throw new Error("Invalid file upload");
              const uniqueName = `${uuidv4()}-${filename}`;
              const filePath = `/img/${uniqueName}`;
              const fileStream = createReadStream();
              await new Promise((resolve, reject) => {
                fileStream
                  .pipe(
                    fs.createWriteStream(
                      path.join(__dirname, "../img", uniqueName)
                    )
                  )
                  .on("finish", resolve)
                  .on("error", reject);
              });
              return filePath;
            })
          );
        }
        const existingMotorbike = await context.db.motorbikes.findById(_id);
        if (!existingMotorbike) throw new Error("Motorbike not found");
        const updatedImages = [
          ...(existingMotorbike.images || []),
          ...imagePaths,
        ];
        const motorbikeData = { ...input, images: updatedImages };
        return context.db.motorbikes.updateById(_id, motorbikeData);
      },
      ["admin"]
    ),

    addImagesToMotorbike: authMiddleware(
      async (parent, { _id, files }, context) => {
        console.log("Files received in addImagesToMotorbike:", files);
        if (!files || files.length === 0) throw new Error("No files provided");
        const resolvedFiles = await Promise.all(files);
        const existingMotorbike = await context.db.motorbikes.findById(_id);
        if (!existingMotorbike) throw new Error("Motorbike not found");

        const imagePaths = await Promise.all(
          resolvedFiles.map(async (file) => {
            console.log("Processing file:", file);
            const { createReadStream, filename } = file;
            if (!createReadStream) throw new Error("Invalid file upload");
            const uniqueName = `${uuidv4()}-${filename}`;
            const filePath = `/img/${uniqueName}`;
            const fileStream = createReadStream();
            await new Promise((resolve, reject) => {
              fileStream
                .pipe(
                  fs.createWriteStream(
                    path.join(__dirname, "../img", uniqueName)
                  )
                )
                .on("finish", resolve)
                .on("error", reject);
            });
            return filePath;
          })
        );

        const updatedImages = [
          ...(existingMotorbike.images || []),
          ...imagePaths,
        ];
        return context.db.motorbikes.updateById(_id, { images: updatedImages });
      },
      ["admin"]
    ),
  },
};
