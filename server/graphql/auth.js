import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js"; 

export const typeDef = `
    type LoginResult {
        jwt: String!
    }

    type LoginResponse {
        success: Boolean!
        message: String!
        data: LoginResult
    }

    input LoginInput {
      username: String!
      password: String!
    }

    extend type Mutation {
        login(input: LoginInput): LoginResponse
    }
`;

export const resolvers = {
  Mutation: {
    login: async (parent, args, context, info) => {
      const { username, password } = args.input;
      if (!username || !password) {
        return { success: false, message: "Username or password cannot be empty" };
      }

      const user = await User.findOne({ username });
      if (!user) {
        return { success: false, message: "Invalid username or password" };
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return { success: false, message: "Invalid username or password" };
      }

      const token = jwt.sign(
        { username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      return {
        success: true,
        message: "Login successfully",
        data: { jwt: token },
      };
    },
  },
};
