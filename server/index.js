import { createServer } from "node:http";
import { createYoga } from "graphql-yoga";
import { schema } from "./graphql/schema.js";
import { useGraphQLMiddleware } from "@envelop/graphql-middleware";
import { permissions } from "./permissions.js";
import { db } from "./config.js";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";
import { GraphQLUpload, graphqlUploadExpress } from "graphql-upload"; // Thêm graphql-upload

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import dotenv from "dotenv";
dotenv.config();

import { initDatabase } from "./data/init.js";
await initDatabase();

const signingKey = process.env.JWT_SECRET;
import jwt from "jsonwebtoken";

const yoga = createYoga({
  schema,
  graphqlEndpoint: "/",
  plugins: [useGraphQLMiddleware([permissions])],
  context: async ({ request }) => {
    const authorization = request.headers.get("authorization") ?? "";
    let user = null;

    if (authorization.startsWith("Bearer ")) {
      const token = authorization.substring(7);
      try {
        user = await new Promise((resolve, reject) => {
          jwt.verify(token, signingKey, (error, decoded) => {
            if (error) reject(error);
            resolve(decoded);
          });
        });
      } catch (error) {
        console.error("JWT verification failed:", error.message);
      }
    }

    return {
      db,
      user,
    };
  },
});

const app = express();
app.use("/img", express.static(path.join(__dirname, "img")));
app.get("/img/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "img", filename);
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send("Image not found");
  }
});

// Thêm middleware để xử lý file upload
app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 })); // Giới hạn 10MB, 10 file
app.use(yoga.graphqlEndpoint, yoga);

const PORT = 4000;
app.listen(PORT, () => {
  console.info(`Server is running on http://localhost:${PORT}`);
});
