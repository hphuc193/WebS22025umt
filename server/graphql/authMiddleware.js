import jwt from "jsonwebtoken";

export const authMiddleware = (resolver, roles = []) => {
  return async (parent, args, context, info) => {
    const token = context.req.headers.authorization;
    if (!token) {
      throw new Error("Unauthorized: No token provided");
    }

    try {
      const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
      context.user = decoded;

      if (roles.length && !roles.includes(decoded.role)) {
        throw new Error("Forbidden: You don't have permission");
      }

      return resolver(parent, args, context, info);
    } catch (error) {
      throw new Error("Unauthorized: Invalid token");
    }
  };
};
