import { createServer } from "node:http";
import { createYoga } from "graphql-yoga";
import { schema } from "./graphql/schema.js";
import { useGraphQLMiddleware } from "@envelop/graphql-middleware";
import { permissions } from "./permissions.js";
import { db } from "./config.js";

import dotenv from "dotenv";
dotenv.config();

import {initDatabase} from "./data/init.js"
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

const server = createServer(yoga);

const PORT = 4000;
server.listen(PORT, () => {
  console.info(`Server is running on http://localhost:${PORT}`);
});
