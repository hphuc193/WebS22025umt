import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { v4 as uuidv4 } from "uuid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const typeDef = `
    scalar File

    extend type Mutation {
      upload(file: File!): String!
    }
`;

export const resolvers = {
  Mutation: {
    upload: async (_, { file }) => {
      try {
        const fileArrayBuffer = await file.arrayBuffer();
        const uniqueName = `${uuidv4()}-${file.name}`; // Tạo tên file duy nhất với UUID
        const filePath = `/img/${uniqueName}`; // Đường dẫn trả về
        await fs.promises.writeFile(
          path.join(__dirname, "../img", uniqueName), // Lưu file vào thư mục /img
          Buffer.from(fileArrayBuffer)
        );
        return filePath; // Trả về đường dẫn file
      } catch (e) {
        console.log("Cannot save uploaded file, reason: " + e);
        throw new Error("Failed to upload file"); // Ném lỗi thay vì trả về false
      }
    },
  },
};
