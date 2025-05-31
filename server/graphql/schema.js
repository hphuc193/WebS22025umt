import { createSchema } from "graphql-yoga";
import _ from "lodash";

import { typeDef as hello, resolvers as helloResolvers } from "./hello.js";
import { typeDef as salute, resolvers as saluteResolvers } from "./salute.js";
import { typeDef as upload, resolvers as uploadResolvers } from "./upload.js";
import {
  typeDef as motorbikes,
  resolvers as motorbikesResolvers,
} from "./motorbikes.js"; // Thêm motorbikes
import {
  typeDef as categories,
  resolvers as categoriesResolvers,
} from "./categories.js";
import {
  typeDef as souvenirs,
  resolvers as souvenirsResolvers,
} from "./souvenirs.js";
import {
  typeDef as login,
  resolvers as loginResolvers,
} from "./authentication.js";

const query = `
  type Query {
    _emptyQuery: String
  }

  type Mutation {
    _emptyAction: String
  }
`;

const typeDefs = [
  query,
  hello,
  salute,
  categories,
  login,
  souvenirs,
  upload,
  motorbikes, // Thêm motorbikes vào typeDefs
];

const resolvers = _.merge(
  helloResolvers,
  saluteResolvers,
  categoriesResolvers,
  loginResolvers,
  souvenirsResolvers,
  uploadResolvers,
  motorbikesResolvers // Thêm motorbikesResolvers vào resolvers
);

export const schema = createSchema({
  typeDefs: typeDefs,
  resolvers: resolvers,
});
